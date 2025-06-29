#!/bin/bash

echo "🔍 Testing E-Commerce Services..."

# Test direct services
echo "📦 Testing Product Service (direct):"
curl -s localhost:8082/api/products | head -c 100
echo ""

echo "🚪 Testing API Gateway:"
curl -s localhost:8080/actuator/health
echo ""

echo "📦 Testing Products through Gateway:"
curl -s localhost:8080/api/products | head -c 100
echo ""

echo "👤 Testing Users through Gateway:"
curl -s localhost:8080/api/users | head -c 100
echo ""

echo "🌐 Testing Frontend:"
curl -s localhost:4200 | grep -o "E-Commerce" | head -1
echo ""

echo "📊 Container Status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep ecommerce