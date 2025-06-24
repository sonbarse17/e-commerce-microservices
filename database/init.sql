-- E-Commerce Database Schema for AWS RDS MySQL

CREATE DATABASE IF NOT EXISTS ecommerce_users;
CREATE DATABASE IF NOT EXISTS ecommerce_products;
CREATE DATABASE IF NOT EXISTS ecommerce_inventory;
CREATE DATABASE IF NOT EXISTS ecommerce_orders;
CREATE DATABASE IF NOT EXISTS ecommerce_payments;
CREATE DATABASE IF NOT EXISTS ecommerce_cart;
CREATE DATABASE IF NOT EXISTS ecommerce_notifications;
CREATE DATABASE IF NOT EXISTS ecommerce_reviews;
CREATE DATABASE IF NOT EXISTS ecommerce_analytics;

-- Users Database Schema
USE ecommerce_users;
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    address TEXT,
    role ENUM('CUSTOMER', 'ADMIN') DEFAULT 'CUSTOMER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products Database Schema
USE ecommerce_products;
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100),
    brand VARCHAR(100),
    stock INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    review_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO products (name, description, price, image_url, category, brand, stock, rating, review_count) VALUES
('iPhone 15 Pro', 'Latest Apple smartphone', 999.99, 'https://example.com/iphone15.jpg', 'Electronics', 'Apple', 50, 4.8, 120),
('MacBook Air M3', 'Lightweight laptop', 1299.99, 'https://example.com/macbook-air.jpg', 'Computers', 'Apple', 30, 4.9, 156);

USE ecommerce_users;
INSERT INTO users (username, email, password, first_name, last_name, role) VALUES
('admin', 'admin@ecommerce.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'ADMIN');