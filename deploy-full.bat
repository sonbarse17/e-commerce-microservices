@echo off
echo 🚀 Starting Complete E-Commerce Platform Deployment...
echo 📦 Deploying 10 Microservices + Database + Frontend

REM Clean up any existing containers
echo 🧹 Cleaning up existing containers...
docker-compose -f docker-compose.full.yml down -v
docker system prune -f

REM Build and start services
echo 🔨 Building and starting all services...
docker-compose -f docker-compose.full.yml up -d --build

REM Wait for services to start
echo ⏳ Waiting for services to start (this may take 2-3 minutes)...
timeout /t 60 /nobreak

REM Check service health
echo 🔍 Checking service health...
echo Checking MySQL...
docker exec ecommerce-mysql mysqladmin ping -h localhost --silent
echo Checking Redis...
docker exec ecommerce-redis redis-cli ping
echo Checking API Gateway...
curl -s localhost:8080/actuator/health
echo Checking Product Service...
curl -s localhost:8082/actuator/health
echo Checking Frontend...
curl -s localhost:4200

echo.
echo 🎉 Deployment Complete!
echo.
echo 🌐 Application URLs:
echo 📱 Frontend:        http://localhost:4200
echo 🚪 API Gateway:     http://localhost:8080
echo 👤 User Service:    http://localhost:8081
echo 📦 Product Service: http://localhost:8082
echo 📊 Inventory:       http://localhost:8083
echo 🛒 Order Service:   http://localhost:8084
echo 💳 Payment Service: http://localhost:8085
echo 🛍️  Cart Service:    http://localhost:8086
echo 📧 Notifications:   http://localhost:8087
echo ⭐ Reviews:         http://localhost:8088
echo 📈 Analytics:       http://localhost:8089
echo.
echo 🔗 API Endpoints:
echo 📦 Products: http://localhost:8080/api/products
echo 👤 Users:    http://localhost:8080/api/users
echo 🛒 Orders:   http://localhost:8080/api/orders
echo 🛍️  Cart:     http://localhost:8080/api/cart
echo.
echo 📊 Management:
echo 📋 View logs:    docker-compose -f docker-compose.full.yml logs -f [service-name]
echo 🔄 Restart:      docker-compose -f docker-compose.full.yml restart [service-name]
echo 🛑 Stop all:     docker-compose -f docker-compose.full.yml down
echo 📊 Status:       docker-compose -f docker-compose.full.yml ps

pause