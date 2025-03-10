
# Beauty Salon Management System

Hệ thống quản lý dịch vụ làm đẹp và spa hoàn chỉnh, bao gồm quản lý khách hàng, đặt lịch, dịch vụ, chuyên viên và thanh toán.

## Cấu trúc dự án

Dự án được tổ chức thành hai phần chính:

- `be/`: Backend (Spring Boot)
- `fe/`: Frontend (React)

## Yêu cầu hệ thống

- Java 11 hoặc cao hơn (Project đã được cấu hình để tương thích với Java 11)
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

1. Di chuyển vào thư mục backend:
   ```bash
   cd be
   ```

2. Cấu hình kết nối MySQL trong file `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/beautysalon?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=beautysalon_user
   spring.datasource.password=password
   ```

3. Chạy ứng dụng Spring Boot:
   ```bash
   ./mvnw spring-boot:run
   ```
   Hoặc sử dụng Maven trực tiếp:
   ```bash
   mvn spring-boot:run
   ```

4. API server sẽ khởi chạy tại `http://localhost:8080`

### Bước 3: Cài đặt và chạy Frontend (React)

1. Di chuyển vào thư mục frontend:
   ```bash
   cd fe
   ```

2. Cài đặt các dependencies:
   ```bash
   npm install
   ```

3. Tạo file `.env.local` với nội dung:
   ```
   VITE_API_URL=http://localhost:8080
   ```

4. Chạy ứng dụng frontend:
   ```bash
   npm run dev
   ```

5. Ứng dụng sẽ khởi chạy tại `http://localhost:5173`

### Bước 4: Khởi tạo dữ liệu ban đầu

1. Đăng nhập vào hệ thống bằng tài khoản admin mặc định:
   - Email: admin@beautysalon.com
   - Password: admin

2. Tạo dữ liệu mẫu cho hệ thống bằng cách:
   - Truy cập vào trang Quản lý cơ sở dữ liệu (trong mục Admin)
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

## Các tính năng chính

- Quản lý người dùng và phân quyền
- Đặt lịch dịch vụ
- Quản lý dịch vụ và danh mục
- Quản lý chuyên viên
- Quản lý thanh toán và hóa đơn
- Blog và nội dung

## Quản lý cơ sở dữ liệu

Ứng dụng hỗ trợ các chức năng quản lý cơ sở dữ liệu sau:

1. **Tạo dữ liệu mẫu**: Tạo tự động các bản ghi mẫu cho các bảng trong cơ sở dữ liệu.
2. **Xóa toàn bộ dữ liệu**: Xóa tất cả dữ liệu hiện có trong cơ sở dữ liệu.
3. **Xuất dữ liệu**: Xuất toàn bộ dữ liệu ra định dạng JSON để sao lưu.
4. **Nhập dữ liệu**: Nhập dữ liệu từ định dạng JSON vào cơ sở dữ liệu.

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

## Lưu ý về phiên bản Java

Nếu bạn gặp lỗi khi biên dịch liên quan đến phiên bản Java, hãy đảm bảo:

1. Cài đặt Java 11 hoặc cao hơn
2. Đảm bảo biến môi trường JAVA_HOME trỏ đến đúng thư mục cài đặt Java
3. Kiểm tra phiên bản Java đang sử dụng bằng lệnh: `java -version`

Nếu bạn muốn sử dụng phiên bản Java khác, hãy điều chỉnh giá trị `<java.version>` trong file `pom.xml` cho phù hợp.
