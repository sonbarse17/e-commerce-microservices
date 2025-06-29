#!/bin/bash

# Auto-detect server IP
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ipinfo.io/ip 2>/dev/null || hostname -I | awk '{print $1}')
if [ -z "$SERVER_IP" ]; then
    SERVER_IP="localhost"
fi

echo "Using SERVER_IP: $SERVER_IP"
API_BASE="http://${SERVER_IP}:8080/api"

echo "Testing E-Commerce API Endpoints..."
echo "=================================="

# Test Products
echo "1. Testing Products API..."
curl -s "${API_BASE}/products" | head -c 100
echo -e "\n"

# Test User Registration
echo "2. Testing User Registration..."
curl -s -X POST "${API_BASE}/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser123",
    "email": "test123@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }' | head -c 100
echo -e "\n"

# Test User Login
echo "3. Testing User Login..."
curl -s -X POST "${API_BASE}/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password"
  }' | head -c 100
echo -e "\n"

# Test Cart (will fail without auth, but tests endpoint)
echo "4. Testing Cart API..."
curl -s "${API_BASE}/cart/user/1" | head -c 100
echo -e "\n"

# Test Direct Services
echo "5. Testing Direct Service Connections..."
echo "Product Service: $(curl -s http://${SERVER_IP}:8082/api/products | head -c 50)..."
echo "User Service: $(curl -s http://${SERVER_IP}:8081/api/users | head -c 50)..."

echo -e "\nAPI Test Complete!"