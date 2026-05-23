#!/bin/bash

# OneScale Backend Startup Script

echo "🚀 Starting OneScale Backend API..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies (skip if already installed)
echo "📥 Checking dependencies..."
pip install -r requirements.txt --quiet 2>/dev/null || echo "⚠️  Skipping dependency installation (may already be installed)"

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p uploads

# Start the server
echo "🌟 Starting FastAPI server..."
echo "📍 API will be available at: http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/docs"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Use venv's python directly (more reliable than relying on PATH)
if [ -f "venv/bin/python" ]; then
    venv/bin/python main.py
elif command -v python3 &> /dev/null; then
    python3 main.py
else
    echo "❌ Error: Python not found. Please install Python 3."
    exit 1
fi


