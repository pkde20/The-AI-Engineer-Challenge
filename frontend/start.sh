#!/bin/bash

echo "🚀 Starting AI Engineer Challenge Application"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install frontend dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Check if backend is running
echo "🔍 Checking if backend is running..."
if curl -s http://localhost:8000/api/health > /dev/null; then
    echo "✅ Backend is already running on http://localhost:8000"
else
    echo "⚠️  Backend is not running. Please start it first:"
    echo "   cd ../api && python app.py"
    echo ""
    echo "   Or in a new terminal:"
    echo "   cd ../api && uvicorn app:app --host 0.0.0.0 --port 8000"
    echo ""
fi

echo ""
echo "🌐 Starting frontend development server..."
echo "   Frontend will be available at: http://localhost:3000"
echo "   Press Ctrl+C to stop the server"
echo ""

# Start the frontend
npm run dev 