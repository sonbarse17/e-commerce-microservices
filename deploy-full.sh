#!/bin/bash

echo "🚀 Starting Complete E-Commerce Platform Deployment..."
echo "📦 Deploying 10 Microservices + Database + Frontend"

# Clean up any existing containers
echo "🧹 Cleaning up existing containers..."
docker-compose -f docker-compose.full.yml down -v
docker system prune -f

# Build and start services
echo "🔨 Building and starting all services..."
docker-compose -f docker-compose.full.yml up -d --build

# Wait for services to start
echo "⏳ Waiting for services to start (this may take 2-3 minutes)..."
sleep 60

# Check service health
echo "🔍 Checking service health..."
services=("mysql:3306" "redis:6379" "api-gateway:8080" "user-service:8081" "product-service:8082" "inventory-service:8083" "order-service:8084" "payment-service:8085" "cart-service:8086" "notification-service:8087" "review-service:8088" "analytics-service:8089" "frontend:4200")

for service in "${services[@]}"; do
    name=$(echo $service | cut -d: -f1)
    port=$(echo $service | cut -d: -f2)
    
    if [[ $name == "mysql" ]]; then
        status=$(docker exec ecommerce-mysql mysqladmin ping -h localhost --silent 2>/dev/null && echo "✅" || echo "❌")
    elif [[ $name == "redis" ]]; then
        status=$(docker exec ecommerce-redis redis-cli ping 2>/dev/null | grep -q "PONG" && echo "✅" || echo "❌")
    elif [[ $name == "frontend" ]]; then
        status=$(curl -s localhost:$port | grep -q "E-Commerce" && echo "✅" || echo "❌")
    else
        status=$(curl -s localhost:$port/actuator/health 2>/dev/null | grep -q "UP" && echo "✅" || echo "❌")
    fi
    
    echo "$status $name (port $port)"
done

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "🌐 Application URLs:"
echo "📱 Frontend:        http://localhost:4200"
echo "🚪 API Gateway:     http://localhost:8080"
echo "👤 User Service:    http://localhost:8081"
echo "📦 Product Service: http://localhost:8082"
echo "📊 Inventory:       http://localhost:8083"
echo "🛒 Order Service:   http://localhost:8084"
echo "💳 Payment Service: http://localhost:8085"
echo "🛍️  Cart Service:    http://localhost:8086"
echo "📧 Notifications:   http://localhost:8087"
echo "⭐ Reviews:         http://localhost:8088"
echo "📈 Analytics:       http://localhost:8089"
echo ""
echo "🔗 API Endpoints:"
echo "📦 Products: http://localhost:8080/api/products"
echo "👤 Users:    http://localhost:8080/api/users"
echo "🛒 Orders:   http://localhost:8080/api/orders"
echo "🛍️  Cart:     http://localhost:8080/api/cart"
echo ""
echo "📊 Management:"
echo "📋 View logs:    docker-compose -f docker-compose.full.yml logs -f [service-name]"
echo "🔄 Restart:      docker-compose -f docker-compose.full.yml restart [service-name]"
echo "🛑 Stop all:     docker-compose -f docker-compose.full.yml down"
echo "📊 Status:       docker-compose -f docker-compose.full.yml ps"