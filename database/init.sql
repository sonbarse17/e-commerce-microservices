-- E-Commerce Database Schema for MySQL

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
('iPhone 15 Pro', 'Latest Apple smartphone with titanium design', 999.99, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium.jpg', 'Electronics', 'Apple', 50, 4.8, 120),
('MacBook Air M3', 'Lightweight laptop with M3 chip', 1299.99, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606.jpg', 'Computers', 'Apple', 30, 4.9, 156),
('Samsung Galaxy S24', 'Flagship Android smartphone', 799.99, 'https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s928-sm-s928bztqins-thumb-539573016.jpg', 'Electronics', 'Samsung', 75, 4.6, 89),
('Dell XPS 13', 'Premium ultrabook laptop', 1099.99, 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9315/media-gallery/notebook-xps-13-9315-nt-blue-gallery-4.psd', 'Computers', 'Dell', 25, 4.7, 203),
('Sony WH-1000XM5', 'Noise cancelling headphones', 399.99, 'https://www.sony.com/image/5d02da5df552836db894c9e3e5e83e5d?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF', 'Audio', 'Sony', 100, 4.9, 445),
('iPad Pro 12.9', 'Professional tablet with M2 chip', 1099.99, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-wifi-spacegray-202210.jpg', 'Tablets', 'Apple', 40, 4.8, 167),
('Nintendo Switch OLED', 'Gaming console with OLED screen', 349.99, 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/switch/site-design-update/hardware/switch/nintendo-switch-oled-model-white-set.png', 'Gaming', 'Nintendo', 60, 4.7, 234),
('AirPods Pro 2', 'Wireless earbuds with ANC', 249.99, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83.jpg', 'Audio', 'Apple', 80, 4.6, 312),
('Samsung 55 QLED TV', '4K Smart TV with Quantum Dot', 899.99, 'https://images.samsung.com/is/image/samsung/p6pim/levant/qn55q60cauxzn/gallery/levant-qled-q60c-qn55q60cauxzn-536731692.jpg', 'TV', 'Samsung', 20, 4.5, 78),
('Logitech MX Master 3S', 'Wireless productivity mouse', 99.99, 'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png', 'Accessories', 'Logitech', 150, 4.8, 567);

USE ecommerce_users;
INSERT INTO users (username, email, password, first_name, last_name, role) VALUES
('admin', 'admin@ecommerce.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'ADMIN');