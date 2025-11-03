# OneScale Backend API

FastAPI backend for OneScale data processing and analytics platform.

## Setup

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Run the development server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /` - Basic health check
- `GET /health` - Detailed health status

### File Upload
- `POST /upload` - Upload CSV/Excel files
  - Accepts: CSV (.csv), Excel (.xlsx, .xls)
  - Returns: File analysis including row count, columns, data types, etc.

### File Management
- `GET /files` - List all uploaded files

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## File Processing

The upload endpoint automatically:
- Validates file type (CSV/Excel only)
- Handles different CSV encodings
- Generates comprehensive file analysis
- Saves files to the `uploads/` directory
- Returns detailed metadata about the uploaded data

## Error Handling

The API includes comprehensive error handling for:
- Invalid file types
- File reading errors
- Encoding issues
- Server errors


