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

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p uploads

# Start the server
echo "🌟 Starting FastAPI server..."
echo "📍 API will be available at: http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/docs"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

python main.py


