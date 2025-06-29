#!/bin/bash

echo "Deploying E-Commerce Microservices to Kubernetes..."

# Create namespace
kubectl apply -f namespace.yaml

# Create ConfigMap and Secrets
kubectl apply -f configmap.yaml
kubectl apply -f secrets.yaml

# Deploy databases
kubectl apply -f mysql.yaml
kubectl apply -f redis.yaml

# Wait for databases to be ready
echo "Waiting for databases to be ready..."
kubectl wait --for=condition=ready pod -l app=mysql -n ecommerce --timeout=300s
kubectl wait --for=condition=ready pod -l app=redis -n ecommerce --timeout=300s

# Deploy microservices
kubectl apply -f microservices.yaml
kubectl apply -f api-gateway.yaml

# Wait for services to be ready
echo "Waiting for microservices to be ready..."
kubectl wait --for=condition=ready pod -l app=user-service -n ecommerce --timeout=300s
kubectl wait --for=condition=ready pod -l app=product-service -n ecommerce --timeout=300s
kubectl wait --for=condition=ready pod -l app=api-gateway -n ecommerce --timeout=300s

# Deploy frontend
kubectl apply -f frontend.yaml

echo "Deployment complete!"
echo ""
echo "Services:"
kubectl get services -n ecommerce
echo ""
echo "Pods:"
kubectl get pods -n ecommerce