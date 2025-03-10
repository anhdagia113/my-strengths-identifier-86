
# Beauty Salon Management System

Hệ thống quản lý dịch vụ làm đẹp và spa hoàn chỉnh, bao gồm quản lý khách hàng, đặt lịch, dịch vụ, chuyên viên và thanh toán.

## Yêu cầu hệ thống

- Java 17
- Node.js 18+ và npm/yarn
- MySQL 8.0

## Cài đặt và chạy

### Backend (Spring Boot)

1. Clone repository và di chuyển vào thư mục backend:
   ```
   cd backend
   ```

2. Cấu hình cơ sở dữ liệu MySQL:
   - Đảm bảo MySQL đang chạy
   - Tạo cơ sở dữ liệu (database sẽ được tạo tự động theo cấu hình)
   - Cập nhật tệp `application.properties` nếu cần thiết với thông tin kết nối MySQL của bạn

3. Chạy ứng dụng Spring Boot:
   ```
   ./mvnw spring-boot:run
   ```
   Hoặc sử dụng Maven trực tiếp:
   ```
   mvn spring-boot:run
   ```

4. API server sẽ khởi chạy tại `http://localhost:8080`

### Frontend (React)

1. Di chuyển vào thư mục gốc của dự án và cài đặt các dependencies:
   ```
   npm install
   ```

2. Chạy ứng dụng frontend:
   ```
   npm run dev
   ```

3. Ứng dụng sẽ khởi chạy tại `http://localhost:5173`

## Tài khoản mặc định

- Admin:
  - Email: admin@beautysalon.com
  - Password: admin

## Cấu trúc dự án

- `/backend`: Mã nguồn của API server (Spring Boot)
- `/src`: Mã nguồn của giao diện người dùng (React)
  - `/api`: Các service và models cho API
  - `/components`: Components React
  - `/pages`: Các trang của ứng dụng
  - `/types`: Định nghĩa kiểu TypeScript

## Các tính năng chính

- Quản lý người dùng và phân quyền
- Đặt lịch dịch vụ
- Quản lý dịch vụ và danh mục
- Quản lý chuyên viên
- Quản lý thanh toán và hóa đơn
- Blog và nội dung
