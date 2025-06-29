#!/bin/bash

echo "🚀 Starting E-Commerce Platform Deployment..."

# Clean up any existing containers
echo "🧹 Cleaning up existing containers..."
docker-compose -f docker-compose.simple.yml down -v
docker system prune -f

# Build and start services
echo "🔨 Building and starting services..."
docker-compose -f docker-compose.simple.yml up -d --build

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 30

# Check service health
echo "🔍 Checking service health..."
echo "MySQL: $(docker exec ecommerce-mysql mysqladmin ping -h localhost --silent && echo '✅ Healthy' || echo '❌ Unhealthy')"
echo "Redis: $(docker exec ecommerce-redis redis-cli ping 2>/dev/null && echo '✅ Healthy' || echo '❌ Unhealthy')"
echo "API Gateway: $(curl -s localhost:8080/actuator/health | grep -q 'UP' && echo '✅ Healthy' || echo '❌ Unhealthy')"
echo "Product Service: $(curl -s localhost:8082/actuator/health | grep -q 'UP' && echo '✅ Healthy' || echo '❌ Unhealthy')"
echo "Frontend: $(curl -s localhost:4200 | grep -q 'E-Commerce' && echo '✅ Healthy' || echo '❌ Unhealthy')"

echo ""
echo "🎉 Deployment Complete!"
echo "📱 Frontend: http://localhost:4200"
echo "🚪 API Gateway: http://localhost:8080"
echo "📦 Products API: http://localhost:8080/api/products"
echo "👤 Users API: http://localhost:8080/api/users"
echo ""
echo "📊 View logs: docker-compose -f docker-compose.simple.yml logs -f"
echo "🛑 Stop services: docker-compose -f docker-compose.simple.yml down"