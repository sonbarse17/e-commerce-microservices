# AWS RDS MySQL Setup Guide

## 1. Create RDS MySQL Instance

### Using AWS Console:
1. Go to AWS RDS Console
2. Click "Create database"
3. Choose "Standard create"
4. Select "MySQL" engine
5. Choose version 8.0.x
6. Select "Free tier" template (for development)

### Configuration:
- **DB Instance Identifier**: `ecommerce-mysql`
- **Master Username**: `admin`
- **Master Password**: `your-secure-password`
- **DB Instance Class**: `db.t3.micro` (free tier)
- **Storage**: 20 GB General Purpose SSD
- **VPC**: Default VPC
- **Public Access**: Yes (for development)
- **Security Group**: Create new with port 3306 open

## 2. Configure Security Group

1. Go to EC2 Console > Security Groups
2. Find the RDS security group
3. Add inbound rule:
   - Type: MySQL/Aurora
   - Port: 3306
   - Source: 0.0.0.0/0 (for development only)

## 3. Update Application Configuration

Replace the database configuration in each microservice's `application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://your-rds-endpoint:3306/database_name
    username: admin
    password: your-secure-password
    driver-class-name: com.mysql.cj.jdbc.Driver
```

## 4. RDS Endpoint Examples

Update these in your application.yml files:

### User Service:
```yaml
spring:
  datasource:
    url: jdbc:mysql://ecommerce-mysql.xxxxxxxxx.us-east-1.rds.amazonaws.com:3306/ecommerce_users
```

### Product Service:
```yaml
spring:
  datasource:
    url: jdbc:mysql://ecommerce-mysql.xxxxxxxxx.us-east-1.rds.amazonaws.com:3306/ecommerce_products
```

### Order Service:
```yaml
spring:
  datasource:
    url: jdbc:mysql://ecommerce-mysql.xxxxxxxxx.us-east-1.rds.amazonaws.com:3306/ecommerce_orders
```

### Cart Service:
```yaml
spring:
  datasource:
    url: jdbc:mysql://ecommerce-mysql.xxxxxxxxx.us-east-1.rds.amazonaws.com:3306/ecommerce_cart
```

## 5. Initialize Database

Connect to your RDS instance using MySQL client:

```bash
mysql -h your-rds-endpoint -u admin -p
```

Then run the SQL script:
```sql
source database/init.sql
```

## 6. Environment Variables

For production, use environment variables:

```bash
export DB_HOST=your-rds-endpoint
export DB_USERNAME=admin
export DB_PASSWORD=your-secure-password
```

## 7. Connection Testing

Test connection from your application:

```bash
# Test from local machine
mysql -h your-rds-endpoint -u admin -p -e "SHOW DATABASES;"
```

## 8. Production Security

For production deployment:
- Use private subnets for RDS
- Restrict security group to application subnets only
- Use IAM database authentication
- Enable encryption at rest
- Enable automated backups
- Use read replicas for scaling

## 9. Monitoring

Enable:
- CloudWatch monitoring
- Performance Insights
- Enhanced monitoring
- Log exports (error, general, slow query)

## 10. Cost Optimization

- Use appropriate instance sizes
- Enable storage autoscaling
- Schedule non-production instances
- Use Reserved Instances for production