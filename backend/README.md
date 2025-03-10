
# Beauty Salon API Server

This is the backend API server for the Beauty Salon application, built with Spring Boot and Java 17.

## Technology Stack

- Java 17
- Spring Boot 3.2.x
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL
- Maven

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── beautysalon/
│   │   │           ├── config/           # Configuration classes
│   │   │           ├── controller/       # REST controllers
│   │   │           ├── dto/              # Data Transfer Objects
│   │   │           ├── exception/        # Custom exceptions and handlers
│   │   │           ├── model/            # Entity classes
│   │   │           ├── repository/       # Data repositories
│   │   │           ├── security/         # Security configuration
│   │   │           ├── service/          # Business logic services
│   │   │           ├── util/             # Utility classes
│   │   │           └── BeautySalonApplication.java  # Main application class
│   │   └── resources/
│   │       ├── application.properties    # Application properties
│   │       ├── application-dev.properties # Development environment properties
│   │       ├── application-prod.properties # Production environment properties
│   │       └── db/
│   │           └── migration/            # Database migration scripts
│   └── test/                             # Test classes
├── pom.xml                               # Maven configuration
└── README.md                             # Project documentation
```

## Getting Started

### Prerequisites

- Java Development Kit (JDK) 17
- Maven 3.8+
- PostgreSQL 13+

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE beautysalon;
   ```

3. Configure database connection in `application-dev.properties`.

4. Build and run the application:
   ```bash
   ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
   ```

The API will be available at `http://localhost:8080/api`.

## API Documentation

Once the application is running, you can access the Swagger UI documentation at `http://localhost:8080/swagger-ui.html`.

## Development

### Code Style

This project follows the [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html).

### Database Migrations

We use Flyway for database migrations. Migration scripts should be placed in `src/main/resources/db/migration` with the naming convention `V{version}__{description}.sql`.

### Testing

Run tests with:
```bash
./mvnw test
```

## Deployment

For production deployment, build the application with:
```bash
./mvnw clean package -Pprod
```

The JAR file will be generated in the `target` directory.

## Security

- Authentication is handled via JWT tokens
- Role-based access control is implemented
- CORS is configured for the frontend application

## Environment Variables

The following environment variables can be set:

- `SPRING_PROFILES_ACTIVE`: Set to `dev`, `test`, or `prod`
- `DATABASE_URL`: JDBC URL for the database
- `DATABASE_USERNAME`: Database username
- `DATABASE_PASSWORD`: Database password
- `JWT_SECRET`: Secret key for JWT token signing
- `JWT_EXPIRATION`: Token expiration time in milliseconds

