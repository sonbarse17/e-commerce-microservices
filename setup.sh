#!/bin/bash

# Auto-detect server IP and update .env file
echo "Detecting server IP..."

# Try multiple methods to get external IP
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ipinfo.io/ip 2>/dev/null || hostname -I | awk '{print $1}')

if [ -z "$SERVER_IP" ]; then
    echo "Could not detect server IP, using localhost"
    SERVER_IP="localhost"
fi

echo "Detected SERVER_IP: $SERVER_IP"

# Update .env file
sed -i "s/SERVER_IP=.*/SERVER_IP=$SERVER_IP/" .env

echo "Updated .env file with SERVER_IP=$SERVER_IP"
echo "Starting services..."

# Start Docker Compose
docker-compose up --build