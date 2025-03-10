
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS beautysalon;

-- Use the database
USE beautysalon;

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    profile_image VARCHAR(255),
    enabled BOOLEAN DEFAULT TRUE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create user_roles join table
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL,
    payment_method VARCHAR(100),
    description VARCHAR(255),
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create payment_methods table
CREATE TABLE IF NOT EXISTS payment_methods (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    masked_number VARCHAR(30),
    expiry_date VARCHAR(10),
    is_default BOOLEAN DEFAULT FALSE,
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES 
('ROLE_ADMIN', 'Administrator role with full access'),
('ROLE_USER', 'Regular user role'),
('ROLE_STAFF', 'Staff member role');

-- Insert admin user (password is 'admin' - encrypted)
INSERT INTO users (name, email, password, enabled) VALUES 
('Admin User', 'admin@beautysalon.com', '$2a$10$ixlPY3AAd4ty1l6E2IsQ9OFZi2ba9ZQE0bP7RFcGIWNhyFrrT3YUi', TRUE);

-- Assign admin role to admin user
INSERT INTO user_roles (user_id, role_id) VALUES 
(1, 1);

-- Insert sample payment methods
INSERT INTO payment_methods (type, name, masked_number, expiry_date, is_default, user_id) VALUES
('CREDIT_CARD', 'Visa', '****1234', '05/25', TRUE, 1),
('CREDIT_CARD', 'Mastercard', '****5678', '08/24', FALSE, 1);

-- Insert sample payments
INSERT INTO payments (transaction_id, amount, payment_date, status, payment_method, description, user_id) VALUES
('TX12345', 450000, '2023-06-15 09:30:00', 'COMPLETED', 'Visa ****1234', 'Chăm sóc da cơ bản', 1),
('TX12346', 650000, '2023-05-20 14:00:00', 'COMPLETED', 'Mastercard ****5678', 'Trị mụn chuyên sâu', 1),
('TX12347', 850000, '2023-04-10 10:15:00', 'COMPLETED', 'Visa ****1234', 'Trẻ hóa da', 1),
('TX12348', 350000, '2023-03-05 16:30:00', 'FAILED', 'Mastercard ****5678', 'Massage mặt', 1),
('TX12349', 250000, '2023-02-18 11:00:00', 'REFUNDED', 'Visa ****1234', 'Tẩy trang chuyên sâu', 1);
