# main.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from pathlib import Path
import shutil
import pandas as pd
from utils.cleaning import fill_missing_values, strip_whitespace, standardize_column_names

app = FastAPI()
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

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
