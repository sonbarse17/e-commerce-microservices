@echo off
echo Setting up E-Commerce Microservices Platform...

echo Creating backend service directories...
cd backend

for %%s in (product-service inventory-service order-service payment-service cart-service notification-service review-service analytics-service) do (
    echo Setting up %%s...
    cd %%s
    mkdir src\main\java\com\ecommerce\%%s 2>nul
    mkdir src\main\resources 2>nul
    cd ..
)

echo Creating frontend component directories...
cd ..\frontend\src\app\components

mkdir product-detail checkout order-history user-profile admin admin\admin-dashboard 2>nul

echo Setup complete!
echo.
echo To start the application:
echo 1. Configure AWS RDS MySQL connection in application.yml files
echo 2. Run: docker-compose up -d
echo 3. Frontend will be available at http://localhost:4200
echo 4. API Gateway at http://localhost:8080
echo.
echo Microservices:
echo - API Gateway: http://localhost:8080
echo - User Service: http://localhost:8081
echo - Product Service: http://localhost:8082
echo - Inventory Service: http://localhost:8083
echo - Order Service: http://localhost:8084
echo - Payment Service: http://localhost:8085
echo - Cart Service: http://localhost:8086
echo - Notification Service: http://localhost:8087
echo - Review Service: http://localhost:8088
echo - Analytics Service: http://localhost:8089

pause