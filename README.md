
# Beauty Salon Management System

Hệ thống quản lý dịch vụ làm đẹp và spa hoàn chỉnh, bao gồm quản lý khách hàng, đặt lịch, dịch vụ, chuyên viên và thanh toán.

## Yêu cầu hệ thống

- Java 17
- Node.js 18+ và npm/yarn
- MySQL 8.0

## Cài đặt và chạy trên môi trường local

### Bước 1: Cài đặt cơ sở dữ liệu MySQL

1. Cài đặt MySQL 8.0 hoặc cao hơn từ [trang chủ MySQL](https://dev.mysql.com/downloads/installer/).
2. Đảm bảo MySQL service đang hoạt động.
3. Tạo database mới có tên `beautysalon`:
   ```sql
   CREATE DATABASE beautysalon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
4. Tạo user cho ứng dụng và cấp quyền:
   ```sql
   CREATE USER 'beautysalon_user'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON beautysalon.* TO 'beautysalon_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Bước 2: Cài đặt và chạy Backend (Spring Boot)

1. Clone repository và di chuyển vào thư mục dự án:
   ```bash
   git clone https://github.com/your-username/beautysalon.git
   cd beautysalon
   ```

2. Cấu hình kết nối MySQL trong file `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/beautysalon?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=beautysalon_user
   spring.datasource.password=password
   ```

3. Chạy ứng dụng Spring Boot từ thư mục `backend`:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   Hoặc sử dụng Maven trực tiếp:
   ```bash
   mvn spring-boot:run
   ```

4. API server sẽ khởi chạy tại `http://localhost:8080`

### Bước 3: Cài đặt và chạy Frontend (React)

1. Di chuyển về thư mục gốc của dự án và cài đặt các dependencies:
   ```bash
   cd ..
   npm install
   ```

2. Tạo file `.env.local` với nội dung:
   ```
   VITE_API_URL=http://localhost:8080
   ```

3. Chạy ứng dụng frontend:
   ```bash
   npm run dev
   ```

4. Ứng dụng sẽ khởi chạy tại `http://localhost:5173`

### Bước 4: Khởi tạo dữ liệu ban đầu

1. Đăng nhập vào hệ thống bằng tài khoản admin mặc định:
   - Email: admin@beautysalon.com
   - Password: admin

2. Tạo dữ liệu mẫu cho hệ thống bằng cách:
   - Truy cập vào trang Quản lý cơ sở dữ liệu
   - Chọn "Tạo dữ liệu mẫu" hoặc "Nhập dữ liệu" để tải lên dữ liệu từ file

## Nhập dữ liệu vào hệ thống

Có hai cách để nhập dữ liệu vào hệ thống:

### Cách 1: Sử dụng tính năng tạo dữ liệu mẫu

1. Đăng nhập với tài khoản admin
2. Truy cập vào mục Quản lý cơ sở dữ liệu
3. Chọn "Tạo dữ liệu mẫu"

### Cách 2: Nhập dữ liệu từ file JSON

1. Chuẩn bị file JSON với định dạng như mẫu trong `sample-data.json` 
2. Đăng nhập với tài khoản admin
3. Truy cập vào mục Quản lý cơ sở dữ liệu
4. Chọn tab "Nhập dữ liệu"
5. Dán nội dung JSON hoặc sử dụng nút "Lấy dữ liệu mẫu"
6. Nhấn "Nhập dữ liệu"

## Tài khoản mặc định

- Admin:
  - Email: admin@beautysalon.com
  - Password: admin

## Cấu trúc dự án

- `/backend`: Mã nguồn của API server (Spring Boot)
  - `/src/main/java/com/beautysalon`: Java source code
  - `/src/main/resources`: Config files, SQL scripts
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

## Đóng góp và phát triển

Để đóng góp vào dự án, vui lòng:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit các thay đổi (`git commit -m 'Add some amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## Lưu ý về bảo mật

- Đây là ứng dụng mẫu, không nên sử dụng trực tiếp trong môi trường sản xuất mà không có đánh giá bảo mật.
- Hãy đổi mật khẩu admin và các thông tin nhạy cảm trước khi triển khai.
- Cập nhật các dependencies thường xuyên để đảm bảo bảo mật.

