# main.py
from fastapi import FastAPI, UploadFile, File, HTTPException, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil
import pandas as pd
import os
import io
from typing import Optional
from dotenv import load_dotenv
from pydantic import BaseModel
from supabase import create_client, Client

from utils.cleaning import fill_missing_values, strip_whitespace, standardize_column_names
from utils.schema_detector import detect_schema
from utils.db_builder import DatabaseBuilder
from utils.pipeline import DataPipeline
from services.analysis_wrapper import process_file_background
from routers import data_quality, analytics, files, simple_analytics

# Load environment variables
load_dotenv()

app = FastAPI(title="OneScale Data Pipeline API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


class IngestRequest(BaseModel):
    file_path: str
    user_id: str


class AnalyzeRequest(BaseModel):
    file_id: str
    file_path: str
    user_id: str


def get_supabase_client() -> Client:
    """
    Create a Supabase client using service role credentials.
    This is used only to download files from Storage for ingestion.
    """
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    if not supabase_url or not supabase_key:
        raise HTTPException(
            status_code=500,
            detail="Supabase credentials are not configured on the server.",
        )

    return create_client(supabase_url, supabase_key)

# Initialize database builder (optional - only if Supabase credentials are provided)
db_builder = None
try:
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if supabase_url and supabase_key:
        db_builder = DatabaseBuilder(supabase_url, supabase_key)
except Exception as e:
    print(f"Warning: Could not initialize database builder: {e}")

# Initialize pipeline
pipeline = DataPipeline(db_builder=db_builder)

# Include routers
app.include_router(data_quality.router)
app.include_router(analytics.router)
app.include_router(files.router)
app.include_router(simple_analytics.router)


@app.post("/api/ingest")
async def ingest_file(request: IngestRequest):
    """
    Minimal endpoint to prove frontend → backend connectivity.

    1. Receives a Supabase Storage file path and user_id from the frontend.
    2. Downloads the file from Supabase Storage.
    3. Loads it into a Pandas DataFrame (CSV or Excel only).
    4. Logs df.shape and df.head() to the server console.
    5. Returns a small JSON payload with rows/columns.
    """
    try:
        client = get_supabase_client()
    except HTTPException:
        # Re-raise configuration errors with clear message
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to initialize Supabase client: {e}",
        )

    bucket_name = os.getenv("SUPABASE_UPLOAD_BUCKET", "manual-uploads")

    # Download the file from Supabase Storage
    try:
        storage = client.storage.from_(bucket_name)
        file_bytes = storage.download(request.file_path)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Could not download file from Supabase Storage: {e}",
        )

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="Downloaded file is empty or missing.",
        )

    # Determine file type and load into Pandas
    file_extension = Path(request.file_path).suffix.lower()
    try:
        if file_extension == ".csv":
            df = pd.read_csv(io.BytesIO(file_bytes))
        elif file_extension in [".xlsx", ".xls"]:
            df = pd.read_excel(io.BytesIO(file_bytes))
        else:
            raise HTTPException(
                status_code=400,
                detail="Unsupported file type. Only .csv and .xlsx/.xls are supported.",
            )
    except HTTPException:
        # Propagate explicit HTTP errors
        raise
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Could not parse file contents: {e}",
        )

    # Log basic DataFrame info to the server console
    try:
        print(f"[Ingest] User: {request.user_id}")
        print(f"[Ingest] File path: {request.file_path}")
        print(f"[Ingest] DataFrame shape: {df.shape}")
        print("[Ingest] DataFrame head:")
        print(df.head())
    except Exception:
        # Logging should never crash the endpoint
        pass

    rows, columns = df.shape

    return {
        "status": "success",
        "rows": int(rows),
        "columns": int(columns),
    }


@app.post("/api/analyze")
async def trigger_analysis(request: AnalyzeRequest, background_tasks: BackgroundTasks):
    """
    Async Endpoint:
    1. Checks if file exists in DB
    2. Kicks off background task
    3. Returns 'Accepted' immediately
    """
    try:
        client = get_supabase_client()
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to initialize Supabase client: {e}",
        )

    # 1. Quick check: Does this file record actually exist?
    # (Optional but good for safety)
    try:
        res = client.table("file_uploads").select("id").eq("id", request.file_id).execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="File record not found in database")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error checking file record: {e}",
        )

    # 2. Add the wrapper to the background queue
    # FastAPI will run this function AFTER returning the 202 response
    background_tasks.add_task(
        process_file_background, 
        request.file_id, 
        request.file_path, 
        request.user_id
    )

    # 3. Return immediately - Do not wait for pandas!
    return {
        "message": "Analysis started", 
        "status": "pending",
        "file_id": request.file_id
    }


@app.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files allowed")
    dest = UPLOAD_DIR / file.filename
    with dest.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"filename": file.filename, "saved_to": str(dest)}

@app.get("/parse/{filename}")
async def parse_csv(filename: str):
    # Check if file exists in uploads directory
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    # Check if it's a CSV file
    if not filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files can be parsed")
    
    try:
        # Read CSV file with pandas
        df = pd.read_csv(file_path)
        
        # Get basic info
        num_rows = len(df)
        num_cols = len(df.columns)
        column_names = df.columns.tolist()
        
        # Get first 5 rows as JSON
        first_5_rows = df.head(5).to_dict(orient="records")
        
        return {
            "filename": filename,
            "rows": num_rows,
            "columns": num_cols,
            "column_names": column_names,
            "first_5_rows": first_5_rows
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading CSV: {str(e)}")


@app.get("/clean/{filename}")
async def clean_csv(filename: str):
    """
    Clean a CSV file by applying data cleaning functions.
    
    Args:
        filename (str): Name of the CSV file in uploads directory
        
    Returns:
        dict: JSON response with cleaning results
    """
    # Check if file exists in uploads directory
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    # Check if it's a CSV file
    if not filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files can be cleaned")
    
    try:
        # Read CSV file with pandas
        df = pd.read_csv(file_path)
        
        # Store original info for comparison
        original_rows = len(df)
        original_cols = len(df.columns)
        original_column_names = df.columns.tolist()
        
        # Apply cleaning functions in sequence
        df_cleaned = fill_missing_values(df)
        df_cleaned = strip_whitespace(df_cleaned)
        df_cleaned = standardize_column_names(df_cleaned)
        
        # Get cleaned info
        cleaned_rows = len(df_cleaned)
        cleaned_cols = len(df_cleaned.columns)
        cleaned_column_names = df_cleaned.columns.tolist()
        
        # Get first 5 cleaned rows as JSON
        first_5_cleaned_rows = df_cleaned.head(5).to_dict(orient="records")
        
        return {
            "filename": filename,
            "original_rows": original_rows,
            "original_columns": original_cols,
            "original_column_names": original_column_names,
            "cleaned_rows": cleaned_rows,
            "cleaned_columns": cleaned_cols,
            "cleaned_column_names": cleaned_column_names,
            "first_5_cleaned_rows": first_5_cleaned_rows
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error cleaning CSV: {str(e)}")


@app.post("/process-file")
async def process_file(
    file: UploadFile = File(...),
    user_id: Optional[str] = Query(None),
    clean_data: bool = Query(True),
    create_table: bool = Query(True),
    insert_data: bool = Query(True)
):
    """
    Process a file through the automated pipeline:
    1. Upload file
    2. Detect schema
    3. Create database table (if enabled)
    4. Insert data (if enabled)
    
    Supports CSV and Excel files.
    """
    # Save uploaded file
    file_extension = Path(file.filename).suffix.lower()
    if file_extension not in ['.csv', '.xlsx', '.xls']:
        raise HTTPException(status_code=400, detail="Only CSV and Excel files are supported")
    
    dest = UPLOAD_DIR / file.filename
    with dest.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # Process file through pipeline
        result = pipeline.process_file(
            str(dest),
            user_id=user_id,
            clean_data=clean_data,
            create_table=create_table,
            insert_data=insert_data
        )
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")


@app.get("/detect-schema/{filename}")
async def detect_schema_endpoint(filename: str):
    """
    Detect schema from an uploaded file without creating database infrastructure.
    """
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    try:
        # Read file
        if filename.lower().endswith('.csv'):
            df = pd.read_csv(file_path)
        elif filename.lower().endswith(('.xlsx', '.xls')):
            df = pd.read_excel(file_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
        # Detect schema
        schema = detect_schema(df, table_name=filename)
        
        return {
            "filename": filename,
            "schema": schema
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error detecting schema: {str(e)}")


@app.get("/generate-sql/{filename}")
async def generate_sql_endpoint(
    filename: str,
    user_id: Optional[str] = Query(None)
):
    """
    Generate SQL CREATE TABLE statement from a file without executing it.
    """
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    try:
        # Read file
        if filename.lower().endswith('.csv'):
            df = pd.read_csv(file_path)
        elif filename.lower().endswith(('.xlsx', '.xls')):
            df = pd.read_excel(file_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
        # Detect schema
        schema = detect_schema(df, table_name=filename)
        
        # Generate SQL
        if db_builder:
            sql_result = db_builder.create_table(schema, user_id)
            return {
                "filename": filename,
                "schema": schema,
                "sql": sql_result.get("sql"),
                "indexes_sql": sql_result.get("indexes_sql", []),
                "rls_sql": sql_result.get("rls_sql")
            }
        else:
            # Generate SQL manually if db_builder not available
            table_name = schema["table_name"]
            columns_sql = []
            primary_key = schema.get("primary_key", None)
            
            for col in schema["columns"]:
                col_sql = f'  {col["name"]} {col["sql_type"]}'
                if not col["nullable"]:
                    col_sql += " NOT NULL"
                if col["name"] == primary_key:
                    col_sql += " PRIMARY KEY"
                columns_sql.append(col_sql)
            
            sql = f"CREATE TABLE IF NOT EXISTS {table_name} (\n"
            sql += ",\n".join(columns_sql)
            sql += "\n);"
            
            return {
                "filename": filename,
                "schema": schema,
                "sql": sql,
                "indexes_sql": [],
                "rls_sql": None
            }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating SQL: {str(e)}")


@app.get("/")
async def root():
    return {
        "message": "OneScale Data Pipeline API",
        "version": "1.0.0",
        "endpoints": {
            "upload": "/upload-csv",
            "parse": "/parse/{filename}",
            "clean": "/clean/{filename}",
            "process_file": "/process-file",
            "detect_schema": "/detect-schema/{filename}",
            "generate_sql": "/generate-sql/{filename}",
            "analyze": "/api/analyze",
            "data_quality": "/analysis/quality/{file_id}"
        }
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "database_connected": db_builder is not None
    }


if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting OneScale Backend API...")
    print("📍 API available at: http://localhost:8000")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("🛑 Press Ctrl+C to stop the server\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)
