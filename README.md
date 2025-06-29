# E-Commerce Microservices Platform

A complete e-commerce platform with microservices architecture using Angular, Spring Boot, MySQL, and Redis.

## 🚀 Quick Start

### Prerequisites
- Docker (v20.10+)
- Docker Compose (v2.0+)
- 4GB RAM minimum

### Run Locally
```bash
# Clone and start
git clone <repository-url>
cd e-commerce-microservices

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:4200
# API Gateway: http://localhost:8080
```

## 🏗️ Architecture

### Services & Ports
| Service | Port | Internal | Database |
|---------|------|----------|----------|
| Frontend | 4200 | ecommerce-frontend | - |
| API Gateway | 8080 | ecommerce-gateway | - |
| User Service | 8081 | ecommerce-users | MySQL |
| Product Service | 8082 | ecommerce-products | MySQL |
| Inventory Service | 8083 | ecommerce-inventory | MySQL |
| Order Service | 8084 | ecommerce-orders | MySQL |
| Payment Service | 8085 | ecommerce-payments | MySQL |
| Cart Service | 8086 | ecommerce-cart | MySQL |
| Notification Service | 8087 | ecommerce-notifications | MySQL |
| Review Service | 8088 | ecommerce-reviews | MySQL |
| Analytics Service | 8089 | ecommerce-analytics | MySQL |
| MySQL Database | 3306 | ecommerce-mysql | - |
| Redis Cache | 6379 | ecommerce-redis | - |

### Network Flow
```
Browser → Frontend (4200) → API Gateway (8080) → Microservices (8081-8089) → MySQL/Redis
```

## 🔧 Features

### Working Functionality
- ✅ User registration and login with JWT
- ✅ Product catalog with search and filters
- ✅ Shopping cart functionality
- ✅ Modern responsive UI with animations
- ✅ Database integration with sample data
- ✅ Docker containerization

### API Endpoints
```bash
# Products
GET http://localhost:8080/api/products
GET http://localhost:8080/api/products/categories

# Users
POST http://localhost:8080/api/users/register
POST http://localhost:8080/api/users/login

# Cart
GET http://localhost:8080/api/cart/user/{userId}
POST http://localhost:8080/api/cart/add
```

## 🛠️ Development

### Local Development
```bash
# View logs
docker-compose logs -f [service-name]

# Restart specific service
docker-compose restart [service-name]

# Clean restart
docker-compose down -v
docker-compose up --build
```

### Database Access
```bash
# Connect to MySQL
docker exec -it ecommerce-mysql mysql -u root -p
# Password: password

# View databases
SHOW DATABASES;
USE ecommerce_products;
SELECT * FROM products LIMIT 5;
```

## 🔍 Troubleshooting

### Common Issues
1. **Port conflicts**: Stop other services using ports 3306, 4200, 6379, 8080-8089
2. **Memory issues**: Ensure Docker has at least 4GB RAM allocated
3. **Build failures**: Run `docker system prune -f` and rebuild

### Health Checks
```bash
# Check all containers
docker-compose ps

# Test API Gateway
curl http://localhost:8080/api/products

# Test direct service
curl http://localhost:8082/api/products
```

## 📱 Usage

1. **Access Frontend**: http://localhost:4200
2. **Register Account**: Click Register → Fill form → Submit
3. **Browse Products**: View product catalog with filters
4. **Add to Cart**: Click add to cart on any product
5. **View Cart**: Click cart icon in navigation

## 🏷️ Default Credentials
- **Admin User**: admin / password
- **Database**: root / password

## 🚀 Production Deployment

For production, update:
- Change default passwords in `.env`
- Use proper domain names
- Enable HTTPS
- Configure proper CORS origins
- Use production database credentials