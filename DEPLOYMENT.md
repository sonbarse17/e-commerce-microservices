# E-Commerce Microservices Deployment Guide

## Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.8+
- Docker & Docker Compose
- MySQL 8.0+ (or AWS RDS)

### 1. Clone and Setup
```bash
git clone <repository-url>
cd e-commerce-microservices
```

### 2. Configure Database
- Setup AWS RDS MySQL (see AWS-RDS-Setup.md)
- Update database URLs in application.yml files
- Run database initialization script

### 3. Build Backend Services
```bash
cd backend
mvn clean install
```

### 4. Build Frontend
```bash
cd frontend
npm install
npm run build
```

### 5. Start with Docker Compose
```bash
docker-compose up -d
```

## Manual Deployment

### Backend Services (Start in order)
```bash
# 1. Start API Gateway
cd backend/api-gateway
mvn spring-boot:run

# 2. Start User Service
cd backend/user-service
mvn spring-boot:run

# 3. Start Product Service
cd backend/product-service
mvn spring-boot:run

# 4. Start remaining services...
```

### Frontend
```bash
cd frontend
ng serve
```

## Service URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:4200 | 4200 |
| API Gateway | http://localhost:8080 | 8080 |
| User Service | http://localhost:8081 | 8081 |
| Product Service | http://localhost:8082 | 8082 |
| Inventory Service | http://localhost:8083 | 8083 |
| Order Service | http://localhost:8084 | 8084 |
| Payment Service | http://localhost:8085 | 8085 |
| Cart Service | http://localhost:8086 | 8086 |
| Notification Service | http://localhost:8087 | 8087 |
| Review Service | http://localhost:8088 | 8088 |
| Analytics Service | http://localhost:8089 | 8089 |

## API Documentation

Access Swagger UI at:
- http://localhost:8080/swagger-ui.html (API Gateway)
- http://localhost:8081/swagger-ui.html (User Service)
- http://localhost:8082/swagger-ui.html (Product Service)

## Testing

### Sample API Calls

#### User Registration
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

#### User Login
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

#### Get Products
```bash
curl -X GET http://localhost:8080/api/products
```

## Production Deployment

### AWS Deployment
1. Deploy to ECS/EKS
2. Use Application Load Balancer
3. Configure RDS for database
4. Use ElastiCache for Redis
5. Setup CloudWatch monitoring

### Environment Variables
```bash
# Database
DB_HOST=your-rds-endpoint
DB_USERNAME=admin
DB_PASSWORD=secure-password

# JWT
JWT_SECRET=your-jwt-secret

# Redis
REDIS_HOST=your-redis-endpoint
REDIS_PORT=6379
```

## Monitoring

### Health Checks
- http://localhost:8080/actuator/health
- http://localhost:8081/actuator/health

### Metrics
- http://localhost:8080/actuator/metrics
- http://localhost:8081/actuator/metrics

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check RDS security group
   - Verify connection string
   - Test with MySQL client

2. **Service Not Starting**
   - Check port availability
   - Verify Java version
   - Check application logs

3. **CORS Issues**
   - Verify frontend URL in CORS configuration
   - Check API Gateway routes

### Logs
```bash
# Docker logs
docker-compose logs -f service-name

# Application logs
tail -f logs/application.log
```