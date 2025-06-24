@echo off
echo Building all microservices...

echo Building backend services...
cd backend

echo Building User Service...
cd user-service
call mvn clean package -DskipTests
cd ..

echo Building Product Service...
cd product-service
call mvn clean package -DskipTests
cd ..

echo Building Inventory Service...
cd inventory-service
call mvn clean package -DskipTests
cd ..

echo Building Order Service...
cd order-service
call mvn clean package -DskipTests
cd ..

echo Building Payment Service...
cd payment-service
call mvn clean package -DskipTests
cd ..

echo Building Cart Service...
cd cart-service
call mvn clean package -DskipTests
cd ..

echo Building Notification Service...
cd notification-service
call mvn clean package -DskipTests
cd ..

echo Building Review Service...
cd review-service
call mvn clean package -DskipTests
cd ..

echo Building Analytics Service...
cd analytics-service
call mvn clean package -DskipTests
cd ..

echo Building API Gateway...
cd api-gateway
call mvn clean package -DskipTests
cd ..

cd ..

echo Building frontend...
cd frontend
call npm install
call npm run build
cd ..

echo All services built successfully!
echo Run 'docker-compose up -d' to start all services
pause