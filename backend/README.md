
# Beauty Salon API Server

Đây là máy chủ API backend cho ứng dụng Beauty Salon, được xây dựng bằng Spring Boot và Java 11.

## Công nghệ sử dụng

- Java 11 (LTS)
- Spring Boot 2.7.x
- Spring Security với JWT
- Spring Data JPA
- MySQL
- Maven

## Cấu trúc dự án

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── beautysalon/
│   │   │           ├── config/           # Các lớp cấu hình
│   │   │           ├── controller/       # REST controllers
│   │   │           ├── dto/              # Data Transfer Objects
│   │   │           ├── exception/        # Xử lý ngoại lệ
│   │   │           ├── model/            # Các entity
│   │   │           ├── repository/       # Data repositories
│   │   │           ├── security/         # Cấu hình bảo mật
│   │   │           ├── service/          # Các service xử lý business logic
│   │   │           ├── util/             # Các lớp tiện ích
│   │   │           └── BeautySalonApplication.java  # Lớp chính
│   │   └── resources/
│   │       ├── application.properties    # Cấu hình ứng dụng
│   │       ├── application-dev.properties # Cấu hình môi trường phát triển
│   │       ├── application-prod.properties # Cấu hình môi trường sản xuất
│   │       └── db/
│   │           └── migration/            # Scripts khởi tạo database
│   └── test/                             # Các lớp test
├── pom.xml                               # Cấu hình Maven
└── README.md                             # Tài liệu dự án
```

## Bắt đầu

### Yêu cầu

- Java Development Kit (JDK) 11
- Maven 3.6+
- MySQL 8.0+

### Cài đặt và chạy bằng IntelliJ IDEA

1. Clone repository:
   ```bash
   git clone <đường-dẫn-repository>
   cd backend
   ```

2. Mở dự án trong IntelliJ IDEA:
   - Chọn File > Open
   - Chọn thư mục `backend`
   - Chọn "Open as Project"

3. Cấu hình database MySQL:
   ```sql
   CREATE DATABASE beautysalon;
   ```

4. Cấu hình kết nối database trong `application.properties` hoặc `application-dev.properties`.

5. Chạy ứng dụng từ IntelliJ IDEA:
   - Tìm class `BeautySalonApplication.java`
   - Nhấp chuột phải và chọn "Run 'BeautySalonApplication'"

API sẽ khả dụng tại `http://localhost:8080/api`.

### Cấu hình Spring Boot trong IntelliJ IDEA

1. **Cấu hình JDK**:
   - File > Project Structure > Project
   - Đảm bảo Project SDK được đặt là Java 11

2. **Tùy chỉnh cấu hình chạy**:
   - Run > Edit Configurations
   - Chọn cấu hình BeautySalonApplication
   - Trong tab "Configuration":
     - Thêm VM options: `-Dspring.profiles.active=dev`
     - Đặt Environment variables nếu cần

3. **Debugging**:
   - Đặt breakpoints bằng cách nhấp vào lề trái của editor
   - Chạy ứng dụng ở chế độ debug bằng cách chọn biểu tượng bug hoặc Run > Debug

## Tài liệu API

Khi ứng dụng đang chạy, bạn có thể truy cập tài liệu Swagger UI tại `http://localhost:8080/swagger-ui.html`.

## Phát triển

### Quy tắc code

Dự án này tuân theo [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html).

### Kiểm thử

Chạy kiểm thử với:
```bash
./mvnw test
```

Hoặc chạy thông qua IntelliJ IDEA bằng cách nhấp chuột phải vào thư mục `src/test` và chọn "Run Tests".

## Triển khai

Để triển khai sản phẩm, build ứng dụng với:
```bash
./mvnw clean package -Pprod
```

File JAR sẽ được tạo trong thư mục `target`.

## Bảo mật

- Xác thực được xử lý thông qua token JWT
- Kiểm soát truy cập dựa trên vai trò
- CORS được cấu hình cho ứng dụng frontend

## Biến môi trường

Các biến môi trường sau có thể được cài đặt:

- `SPRING_PROFILES_ACTIVE`: Đặt là `dev`, `test` hoặc `prod`
- `DATABASE_URL`: JDBC URL cho database
- `DATABASE_USERNAME`: Tên người dùng database
- `DATABASE_PASSWORD`: Mật khẩu database
- `JWT_SECRET`: Khóa bí mật cho việc ký JWT token
- `JWT_EXPIRATION`: Thời gian hết hạn token tính bằng mili giây

## Xử lý sự cố trong IntelliJ IDEA

1. **Không tìm thấy classes khi build**:
   - File > Invalidate Caches / Restart
   - Chọn "Invalidate and Restart"

2. **Lỗi Maven**:
   - Mở Maven tool window (View > Tool Windows > Maven)
   - Nhấp "Reimport All Maven Projects"

3. **Lỗi kết nối database**:
   - Kiểm tra cấu hình trong application.properties
   - Kiểm tra MySQL đang chạy
   - Thử kết nối trực tiếp từ cửa sổ Database trong IntelliJ

4. **Kiểm tra logs**:
   - Xem logs trong cửa sổ Run của IntelliJ
   - Kiểm tra file logs nếu được cấu hình trong application.properties
