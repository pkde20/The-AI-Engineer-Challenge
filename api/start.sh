#!/bin/bash
PORT=${PORT:-8000}
echo "Starting server on port $PORT"
uvicorn simple_app:app --host 0.0.0.0 --port $PORT 