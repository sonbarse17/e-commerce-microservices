# E-Commerce Microservices Platform

A complete e-commerce platform built with microservices architecture using Angular, Spring Boot, and AWS RDS.

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
├── build-all.bat             # Build Script
└── README.md
```

## Architecture Overview

### Frontend
- **Angular 17** - Modern web application framework
- **Angular Material** - UI component library
- **RxJS** - Reactive programming

### Backend Microservices
1. **API Gateway** (Port: 8080) - Routing and authentication
2. **User Service** (Port: 8081) - User management
3. **Product Service** (Port: 8082) - Product catalog
4. **Inventory Service** (Port: 8083) - Stock management
5. **Order Service** (Port: 8084) - Order processing
6. **Payment Service** (Port: 8085) - Payment handling
7. **Cart Service** (Port: 8086) - Shopping cart
8. **Notification Service** (Port: 8087) - Notifications
9. **Review Service** (Port: 8088) - Reviews and ratings
10. **Analytics Service** (Port: 8089) - Business analytics

### Infrastructure
- **MySQL** (Port: 3306) - Primary database
- **Redis** (Port: 6379) - Caching and session management
- **Docker Compose** - Container orchestration

## Service Ports

| Service | Port | URL | Description |
|---------|------|-----|-------------|
| Frontend | 4200 | http://localhost:4200 | Angular Web App |
| API Gateway | 8080 | http://localhost:8080 | Main Entry Point |
| User Service | 8081 | http://localhost:8081 | Authentication & Users |
| Product Service | 8082 | http://localhost:8082 | Product Catalog |
| Inventory Service | 8083 | http://localhost:8083 | Stock Management |
| Order Service | 8084 | http://localhost:8084 | Order Processing |
| Payment Service | 8085 | http://localhost:8085 | Payment Handling |
| Cart Service | 8086 | http://localhost:8086 | Shopping Cart |
| Notification Service | 8087 | http://localhost:8087 | Email Notifications |
| Review Service | 8088 | http://localhost:8088 | Product Reviews |
| Analytics Service | 8089 | http://localhost:8089 | Business Analytics |
| MySQL Database | 3306 | localhost:3306 | Primary Database |
| Redis Cache | 6379 | localhost:6379 | Caching Layer |

## Quick Start

### Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.8+
- Docker & Docker Compose
- MySQL 8.0+ (or use Docker)

### Option 1: Docker Deployment (Recommended)
```bash
# Build all services
build-all.bat

# Start all services with Docker
docker-compose up -d

# Check service status
docker-compose ps
```

### Option 2: Manual Setup
```bash
# 1. Start database
# Configure MySQL and Redis

# 2. Build and start each service
cd backend/api-gateway && mvn spring-boot:run
cd backend/user-service && mvn spring-boot:run
# ... repeat for all services

# 3. Start frontend
cd frontend && npm install && ng serve
```

## API Documentation
- **Main API Gateway:** http://localhost:8080/swagger-ui.html
- **Individual Services:** http://localhost:808X/swagger-ui.html (replace X with service port)
- **Health Checks:** http://localhost:808X/actuator/health

## Features
- User registration and authentication
- Product catalog with search and filtering
- Shopping cart management
- Order processing and tracking
- Payment integration
- Product reviews and ratings
- Real-time notifications
- Analytics dashboard
- Inventory management
- Admin panel

## Technology Stack
- **Frontend:** Angular 17, Angular Material, TypeScript
- **Backend:** Spring Boot 3, Spring Security, Spring Data JPA
- **Database:** AWS RDS MySQL, Redis
- **Message Queue:** RabbitMQ
- **API Gateway:** Spring Cloud Gateway
- **Service Discovery:** Eureka
- **Monitoring:** Actuator, Micrometer