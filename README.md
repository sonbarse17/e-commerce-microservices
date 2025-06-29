# E-Commerce Microservices Platform

A complete e-commerce platform built with microservices architecture using Angular, Spring Boot, MySQL, and Redis. This platform demonstrates modern cloud-native development practices with containerized services and scalable architecture.

## Key Features

✅ **Microservices Architecture** - 9 independent services  
✅ **Containerized Deployment** - Docker & Docker Compose  
✅ **API Gateway** - Centralized routing  
✅ **Caching Layer** - Redis for performance optimization  
✅ **Database Per Service** - Isolated data storage  
✅ **No Security Overhead** - Simple development setup

## Project Structure

```
e-commerce-microservices/
├── backend/
│   ├── api-gateway/           # API Gateway (Port: 8080)
│   ├── user-service/          # User Management (Port: 8081)
│   ├── product-service/       # Product Catalog (Port: 8082)
│   ├── inventory-service/     # Stock Management (Port: 8083)
│   ├── order-service/         # Order Processing (Port: 8084)
│   ├── payment-service/       # Payment Handling (Port: 8085)
│   ├── cart-service/          # Shopping Cart (Port: 8086)
│   ├── notification-service/  # Notifications (Port: 8087)
│   ├── review-service/        # Reviews & Ratings (Port: 8088)
│   └── analytics-service/     # Business Analytics (Port: 8089)
├── frontend/                  # Angular App (Port: 4200)
├── database/                  # Database Scripts
├── docker-compose.yml         # Container Orchestration
└── README.md
```

## Service Ports

| Service | Port | URL | Description |
|---------|------|-----|-------------|
| 🌐 Frontend | 4200 | http://localhost:4200 | Angular Web App |
| 🚪 API Gateway | 8080 | http://localhost:8080 | Main Entry Point |
| 👤 User Service | 8081 | http://localhost:8081 | User Management |
| 📦 Product Service | 8082 | http://localhost:8082 | Product Catalog |
| 📊 Inventory Service | 8083 | http://localhost:8083 | Stock Management |
| 🛒 Order Service | 8084 | http://localhost:8084 | Order Processing |
| 💳 Payment Service | 8085 | http://localhost:8085 | Payment Handling |
| 🛍️ Cart Service | 8086 | http://localhost:8086 | Shopping Cart |
| 📧 Notification Service | 8087 | http://localhost:8087 | Notifications |
| ⭐ Review Service | 8088 | http://localhost:8088 | Product Reviews |
| 📈 Analytics Service | 8089 | http://localhost:8089 | Business Analytics |
| 🗄️ MySQL Database | 3306 | localhost:3306 | Primary Database |
| ⚡ Redis Cache | 6379 | localhost:6379 | Caching Layer |

## 🚀 Quick Start

### Prerequisites
- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)
- **4GB RAM** minimum
- **Ports 3306, 4200, 6379, 8080-8089** available

### 🐳 Docker Deployment
```bash
# Clone the repository
git clone <repository-url>
cd e-commerce-microservices

# Start all services
docker-compose up --build

# Check running services
docker-compose ps

# Stop all services
docker-compose down
```

## 📚 API Examples

### User Registration
```bash
curl -X POST http://localhost:8081/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### User Login
```bash
curl -X POST http://localhost:8081/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "password": "password123"
  }'
```

### Get Products
```bash
curl http://localhost:8082/api/products
```

## ✨ Features

### 👤 User Management
- ✅ User registration & login
- ✅ Profile management
- ✅ Simple password storage

### 🛍️ E-Commerce Core
- ✅ Product catalog
- ✅ Shopping cart
- ✅ Order processing
- ✅ Payment handling
- ✅ Inventory tracking
- ✅ Product reviews

### 🔔 Communication
- ✅ Notification system
- ✅ Order updates

### 📊 Analytics
- ✅ Business metrics
- ✅ User analytics

## 🛠️ Technology Stack

### Frontend
- **Framework:** Angular 17
- **Language:** TypeScript
- **Web Server:** Nginx

### Backend
- **Framework:** Spring Boot 3.2.0
- **Data Access:** Spring Data JPA
- **API Gateway:** Spring Cloud Gateway
- **Language:** Java 17
- **Build Tool:** Maven

### Databases
- **Primary:** MySQL 8.0
- **Cache:** Redis 7

### Infrastructure
- **Containerization:** Docker + Docker Compose
- **Base Images:** Eclipse Temurin, Alpine Linux

## 🆘 Troubleshooting

### Port Conflicts
```bash
# Check port usage
netstat -an | findstr :8080

# Stop Docker services
docker-compose down
```

### Database Issues
```bash
# Check MySQL logs
docker-compose logs mysql

# Connect to MySQL
docker exec -it ecommerce-mysql mysql -u root -p
```

### Clean Restart
```bash
# Clean everything
docker-compose down -v
docker system prune -f
docker-compose up --build
```

## 📞 Support

For support:
- Create an issue on GitHub
- Check Docker logs: `docker-compose logs [service-name]`
- Verify all services are running: `docker-compose ps`