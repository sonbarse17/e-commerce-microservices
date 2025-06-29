#!/bin/bash

echo "Building Docker images for Kubernetes deployment..."

# Build all backend services
cd backend

echo "Building API Gateway..."
docker build -t ecommerce/api-gateway:latest -f api-gateway/Dockerfile .

echo "Building User Service..."
docker build -t ecommerce/user-service:latest -f user-service/Dockerfile .

echo "Building Product Service..."
docker build -t ecommerce/product-service:latest -f product-service/Dockerfile .

echo "Building Cart Service..."
docker build -t ecommerce/cart-service:latest -f cart-service/Dockerfile .

echo "Building Inventory Service..."
docker build -t ecommerce/inventory-service:latest -f inventory-service/Dockerfile .

echo "Building Order Service..."
docker build -t ecommerce/order-service:latest -f order-service/Dockerfile .

echo "Building Payment Service..."
docker build -t ecommerce/payment-service:latest -f payment-service/Dockerfile .

echo "Building Notification Service..."
docker build -t ecommerce/notification-service:latest -f notification-service/Dockerfile .

echo "Building Review Service..."
docker build -t ecommerce/review-service:latest -f review-service/Dockerfile .

echo "Building Analytics Service..."
docker build -t ecommerce/analytics-service:latest -f analytics-service/Dockerfile .

cd ..

# Build frontend
echo "Building Frontend..."
docker build -t ecommerce/frontend:latest ./frontend

echo "All images built successfully!"
echo ""
echo "Images:"
docker images | grep ecommerce