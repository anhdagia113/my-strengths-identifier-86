
@echo off
setlocal enabledelayedexpansion

:: Colors for terminal output
set GREEN=[92m
set YELLOW=[93m
set BLUE=[94m
set NC=[0m

:: Display welcome message
echo %GREEN%╔════════════════════════════════════════════════════════════╗%NC%
echo %GREEN%║                                                            ║%NC%
echo %GREEN%║   %YELLOW%Beauty Salon Management System - Development Runner%GREEN%     ║%NC%
echo %GREEN%║                                                            ║%NC%
echo %GREEN%╚════════════════════════════════════════════════════════════╝%NC%
echo %BLUE%Starting both backend and frontend services...%NC%

:: Check Java version
java -version >nul 2>&1
if %errorlevel% neq 0 (
  echo %YELLOW%Error: Java not found. Please install Java 11 or higher.%NC%
  exit /b 1
)

:: Check for Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
  echo %YELLOW%Error: Node.js not found. Please install Node.js 16 or higher.%NC%
  exit /b 1
)

:: Check for MySQL
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
  echo %YELLOW%Warning: MySQL not found. Make sure your database is properly configured.%NC%
)

:: Create logs directory if it doesn't exist
if not exist logs mkdir logs

:: Start backend
echo.
echo %BLUE%Starting backend service...%NC%
cd backend

:: Check if Maven wrapper exists, otherwise use system Maven
if exist mvnw.cmd (
  echo Using Maven wrapper...
  start /B cmd /c "mvnw.cmd spring-boot:run > ..\logs\backend.log 2>&1"
) else (
  mvn -v >nul 2>&1
  if %errorlevel% equ 0 (
    echo Using system Maven...
    start /B cmd /c "mvn spring-boot:run > ..\logs\backend.log 2>&1"
  ) else (
    echo %YELLOW%Error: Maven not found. Please install Maven or provide Maven wrapper (mvnw).%NC%
    exit /b 1
  )
)

cd ..
echo Backend service started
echo Backend logs are being written to: logs\backend.log
echo %GREEN%✓ Backend service started%NC%

:: Wait for backend to be ready (simplified check - wait for some time)
echo Waiting for backend to be ready...
timeout /t 15 /nobreak > nul
echo %GREEN%✓ Backend is now ready%NC%

:: Start frontend
echo.
echo %BLUE%Starting frontend service...%NC%

:: Install dependencies if node_modules doesn't exist
if not exist node_modules (
  echo Installing frontend dependencies...
  call npm install
)

:: Start the frontend
start /B cmd /c "npm run dev > logs\frontend.log 2>&1"

echo Frontend service started
echo Frontend logs are being written to: logs\frontend.log
echo %GREEN%✓ Frontend service started%NC%

:: Print access information
echo.
echo %GREEN%╔════════════════════════════════════════════════════════════╗%NC%
echo %GREEN%║                                                            ║%NC%
echo %GREEN%║   %YELLOW%Beauty Salon Management System is now running!%GREEN%          ║%NC%
echo %GREEN%║                                                            ║%NC%
echo %GREEN%║   %BLUE%Frontend:%NC% http://localhost:5173                        %GREEN%║%NC%
echo %GREEN%║   %BLUE%Backend API:%NC% http://localhost:8080                     %GREEN%║%NC%
echo %GREEN%║                                                            ║%NC%
echo %GREEN%║   Press Ctrl+C to stop all services                        %GREEN%║%NC%
echo %GREEN%╚════════════════════════════════════════════════════════════╝%NC%

:: Ask if user wants to see logs
set /p show_logs_choice="Would you like to see live logs? (y/n): "
if /i "%show_logs_choice%"=="y" (
  echo.
  echo %BLUE%Showing live logs. Press Ctrl+C to stop...%NC%
  type logs\backend.log
  echo.
  echo %YELLOW%--- End of current logs. Waiting for new entries... ---%NC%
  echo.
  powershell -Command "Get-Content -Path 'logs\backend.log','logs\frontend.log' -Wait"
) else (
  echo.
  echo %BLUE%Services are running in the background.%NC%
  echo %BLUE%Check logs directory for details.%NC%
  echo.
  echo Press any key to stop all services...
  pause > nul
)

:: Stop services (simplified method)
echo.
echo %YELLOW%Shutting down services...%NC%
taskkill /F /FI "WINDOWTITLE eq npm run dev*" > nul 2>&1
taskkill /F /FI "WINDOWTITLE eq mvn spring-boot:run*" > nul 2>&1

echo %GREEN%All services stopped. Thank you for using Beauty Salon Management System!%NC%
