
# Beauty Salon Management System

Hệ thống quản lý dịch vụ làm đẹp và spa hoàn chỉnh, bao gồm quản lý khách hàng, đặt lịch, dịch vụ, chuyên viên và thanh toán.

## Cấu trúc dự án

Dự án được tổ chức thành hai phần chính:

- `backend/`: Backend (Spring Boot)
- `src/`: Frontend (React)

## Yêu cầu hệ thống

- Java 11 (LTS)
- Node.js 18+ và npm/yarn
- MySQL 8.0

## Cài đặt và chạy thủ công

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

### Bước 2: Cài đặt và chạy Backend (Spring Boot) bằng IntelliJ IDEA

1. Mở IntelliJ IDEA và chọn "Open" hoặc "Import Project".
2. Chọn thư mục `backend` của dự án và mở nó.
3. IntelliJ sẽ tự động nhận diện đây là một dự án Maven và bắt đầu tải các dependencies.

4. Cấu hình kết nối MySQL:
   - Mở file `backend/src/main/resources/application.properties`
   - Điều chỉnh các thông số kết nối database nếu cần:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/beautysalon?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
     spring.datasource.username=beautysalon_user
     spring.datasource.password=password
     ```

5. Chạy ứng dụng Spring Boot trong IntelliJ:
   - Tìm class `BeautySalonApplication.java` trong cấu trúc dự án
   - Nhấp chuột phải vào file và chọn "Run 'BeautySalonApplication'"
   - Hoặc sử dụng nút Run (biểu tượng play) trong thanh công cụ

6. Để cấu hình biến môi trường hoặc VM options:
   - Chọn "Edit Configurations..." từ menu dropdown Run
   - Thêm các tham số VM nếu cần (ví dụ: `-Dspring.profiles.active=dev`)

7. API server sẽ khởi chạy tại `http://localhost:8080`

### Bước 3: Cài đặt và chạy Frontend (React)

1. Mở terminal và di chuyển đến thư mục gốc của dự án:
   ```bash
   cd đường_dẫn_đến_dự_án
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

### Bước 4: Sử dụng ứng dụng

1. Truy cập ứng dụng frontend tại `http://localhost:5173`
2. Đăng nhập vào hệ thống (thông tin đăng nhập sẽ được cấu hình trong dữ liệu khởi tạo)

## Cấu hình IntelliJ IDEA chi tiết

### Cài đặt JDK

1. Mở IntelliJ IDEA và vào **File > Project Structure**
2. Trong phần **Project Settings > Project**:
   - Chọn Project SDK: 11 (hoặc cao hơn)
   - Project language level: 11
3. Nhấn **Apply** và **OK**

### Cấu hình Maven

1. Vào **File > Settings > Build, Execution, Deployment > Build Tools > Maven**
2. Đảm bảo Maven home path được cấu hình đúng
3. Trong phần **Maven > Runner**, bạn có thể thêm JVM Options nếu cần

### Cấu hình Spring Boot Run

1. Chọn **Run > Edit Configurations**
2. Nhấn **+** (Add New Configuration) và chọn **Spring Boot**
3. Cấu hình như sau:
   - Name: BeautySalonApplication
   - Main class: com.beautysalon.BeautySalonApplication
   - VM Options: -Dspring.profiles.active=dev (nếu cần)
   - Working directory: $MODULE_WORKING_DIR$
   - Use classpath of module: beauty-salon-api
4. Nhấn **Apply** và **OK**

### Debugging trong IntelliJ IDEA

1. Đặt breakpoints bằng cách nhấp chuột vào lề trái của editor
2. Chạy ứng dụng ở chế độ Debug bằng nút Debug hoặc **Run > Debug**
3. Khi ứng dụng dừng tại breakpoint, sử dụng các công cụ debug để kiểm tra biến, tiếp tục thực thi, v.v.

## Thông tin cấu hình khác

### Kiểm tra Logs

- Logs của backend sẽ hiển thị trong cửa sổ Run của IntelliJ IDEA
- Có thể cấu hình log level trong `application.properties`:
  ```properties
  logging.level.root=INFO
  logging.level.com.beautysalon=DEBUG
  ```

### Tùy chọn cấu hình theo môi trường

IntelliJ IDEA cho phép bạn tạo và chuyển đổi giữa các cấu hình chạy khác nhau:

1. Chọn "Edit Configurations..." từ menu dropdown Run
2. Tạo nhiều cấu hình với các tham số khác nhau cho các môi trường dev, test, prod
3. Chọn cấu hình tương ứng trước khi chạy ứng dụng

## Xử lý sự cố

### Backend không khởi động

- Kiểm tra cổng 8080 đã được sử dụng chưa: `netstat -ano | findstr 8080` (Windows) hoặc `lsof -i:8080` (Mac/Linux)
- Kiểm tra kết nối đến MySQL: Đảm bảo MySQL đang chạy và thông tin kết nối chính xác
- Kiểm tra logs trong IntelliJ để xem chi tiết lỗi

### Frontend không kết nối được với Backend

- Kiểm tra CORS đã được cấu hình đúng trong backend
- Kiểm tra biến môi trường `VITE_API_URL` đã được đặt chính xác

## Lưu ý về bảo mật

- Đổi mật khẩu mặc định trước khi triển khai
- Sử dụng HTTPS trong môi trường sản xuất
- Không lưu trữ thông tin nhạy cảm trong mã nguồn
