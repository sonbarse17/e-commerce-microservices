#!/bin/sh

# Health check script for all backend microservices
SERVICES="api-gateway:8080 user-service:8081 product-service:8082 inventory-service:8083 order-service:8084 payment-service:8085 cart-service:8086 notification-service:8087 review-service:8088 analytics-service:8089"

echo "Checking backend services health..."

for service in $SERVICES; do
    SERVICE_NAME=$(echo $service | cut -d: -f1)
    SERVICE_PORT=$(echo $service | cut -d: -f2)
    
    echo "Checking $SERVICE_NAME..."
    
    # Try to connect to health endpoint
    if wget --spider --quiet --timeout=5 --tries=1 "http://$SERVICE_NAME:$SERVICE_PORT/actuator/health" 2>/dev/null; then
        echo "✓ $SERVICE_NAME is healthy"
    else
        echo "✗ $SERVICE_NAME is not healthy"
        exit 1
    fi
done

echo "All backend services are healthy!"
exit 0