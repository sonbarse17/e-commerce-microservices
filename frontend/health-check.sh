#!/bin/sh

# Simple health check for frontend nginx server
echo "Checking frontend nginx server..."

# Check if nginx is serving the frontend
if wget --spider --quiet --timeout=5 --tries=1 "http://localhost:4200" 2>/dev/null; then
    echo "✓ Frontend is healthy"
    exit 0
else
    echo "✗ Frontend is not healthy"
    exit 1
fi