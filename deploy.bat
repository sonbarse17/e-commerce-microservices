@echo off
echo 🚀 Starting E-Commerce Platform Deployment...

REM Clean up any existing containers
echo 🧹 Cleaning up existing containers...
docker-compose -f docker-compose.simple.yml down -v
docker system prune -f

REM Build and start services
echo 🔨 Building and starting services...
docker-compose -f docker-compose.simple.yml up -d --build

REM Wait for services to start
echo ⏳ Waiting for services to start...
timeout /t 30 /nobreak

REM Check service health
echo 🔍 Checking service health...
curl -s localhost:8080/actuator/health
curl -s localhost:8082/actuator/health
curl -s localhost:4200

echo.
echo 🎉 Deployment Complete!
echo 📱 Frontend: http://localhost:4200
echo 🚪 API Gateway: http://localhost:8080
echo 📦 Products API: http://localhost:8080/api/products
echo 👤 Users API: http://localhost:8080/api/users
echo.
echo 📊 View logs: docker-compose -f docker-compose.simple.yml logs -f
echo 🛑 Stop services: docker-compose -f docker-compose.simple.yml down

pause