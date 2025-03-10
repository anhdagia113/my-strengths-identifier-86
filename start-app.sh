
#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Display welcome message
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}║   ${YELLOW}Beauty Salon Management System - Development Runner${GREEN}     ║${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo -e "${BLUE}Starting both backend and frontend services...${NC}\n"

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check Java version
if command_exists java; then
  JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
  if [ "$JAVA_VERSION" -lt 11 ]; then
    echo -e "${YELLOW}Warning: Java version is below 11. This application requires Java 11 or higher.${NC}"
    echo "Current Java version: $(java -version 2>&1 | head -1)"
    exit 1
  else
    echo -e "${GREEN}✓ Java version $JAVA_VERSION detected${NC}"
  fi
else
  echo -e "${YELLOW}Error: Java not found. Please install Java 11 or higher.${NC}"
  exit 1
fi

# Check Node.js version
if command_exists node; then
  NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
  if [ "$NODE_VERSION" -lt 16 ]; then
    echo -e "${YELLOW}Warning: Node.js version is below 16. This application works best with Node.js 16 or higher.${NC}"
    echo "Current Node.js version: $(node -v)"
  else
    echo -e "${GREEN}✓ Node.js version $NODE_VERSION detected${NC}"
  fi
else
  echo -e "${YELLOW}Error: Node.js not found. Please install Node.js 16 or higher.${NC}"
  exit 1
fi

# Check MySQL
if command_exists mysql; then
  echo -e "${GREEN}✓ MySQL detected${NC}"
else
  echo -e "${YELLOW}Warning: MySQL not found. Make sure your database is properly configured.${NC}"
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Function to start the backend
start_backend() {
  echo -e "\n${BLUE}Starting backend service...${NC}"
  
  # Navigate to backend directory
  cd backend
  
  # Check if Maven wrapper exists, otherwise use system Maven
  if [ -f "./mvnw" ]; then
    echo "Using Maven wrapper..."
    chmod +x ./mvnw
    ./mvnw spring-boot:run > ../logs/backend.log 2>&1 &
  elif command_exists mvn; then
    echo "Using system Maven..."
    mvn spring-boot:run > ../logs/backend.log 2>&1 &
  else
    echo -e "${YELLOW}Error: Maven not found. Please install Maven or provide Maven wrapper (mvnw).${NC}"
    exit 1
  fi
  
  BACKEND_PID=$!
  cd ..
  
  echo "Backend started with PID: $BACKEND_PID"
  echo "Backend logs are being written to: logs/backend.log"
  echo -e "${GREEN}✓ Backend service started${NC}"
  
  # Wait for backend to be ready
  echo "Waiting for backend to be ready..."
  while ! nc -z localhost 8080 >/dev/null 2>&1; do
    sleep 1
  done
  echo -e "${GREEN}✓ Backend is now ready${NC}"
}

# Function to start the frontend
start_frontend() {
  echo -e "\n${BLUE}Starting frontend service...${NC}"
  
  # Make sure we're in the project root
  cd "$(dirname "$0")"
  
  # Install dependencies if node_modules doesn't exist
  if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
  fi
  
  # Start the frontend
  npm run dev > logs/frontend.log 2>&1 &
  FRONTEND_PID=$!
  
  echo "Frontend started with PID: $FRONTEND_PID"
  echo "Frontend logs are being written to: logs/frontend.log"
  echo -e "${GREEN}✓ Frontend service started${NC}"
}

# Function to handle cleanup on exit
cleanup() {
  echo -e "\n${YELLOW}Shutting down services...${NC}"
  
  # Kill the processes
  if [ -n "$BACKEND_PID" ]; then
    echo "Stopping backend (PID: $BACKEND_PID)..."
    kill $BACKEND_PID 2>/dev/null
  fi
  
  if [ -n "$FRONTEND_PID" ]; then
    echo "Stopping frontend (PID: $FRONTEND_PID)..."
    kill $FRONTEND_PID 2>/dev/null
  fi
  
  echo -e "${GREEN}All services stopped. Thank you for using Beauty Salon Management System!${NC}"
  exit 0
}

# Register the cleanup function for when the script exits
trap cleanup EXIT INT TERM

# Start backend and frontend
start_backend
start_frontend

# Print access information
echo -e "\n${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}║   ${YELLOW}Beauty Salon Management System is now running!${GREEN}          ║${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}║   ${BLUE}Frontend:${NC} http://localhost:5173                        ${GREEN}║${NC}"
echo -e "${GREEN}║   ${BLUE}Backend API:${NC} http://localhost:8080                     ${GREEN}║${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}║   Press Ctrl+C to stop all services                        ${GREEN}║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"

# Keep the script running to maintain the started processes
echo -e "\n${BLUE}Monitoring services. Press Ctrl+C to stop...${NC}"
echo -e "Real-time logs are available in the logs directory."

# Create a function to display live logs
show_logs() {
  tail -f logs/backend.log logs/frontend.log
}

# Ask if user wants to see logs
read -p "Would you like to see live logs? (y/n): " show_logs_choice
if [ "$show_logs_choice" = "y" ] || [ "$show_logs_choice" = "Y" ]; then
  show_logs
else
  # Wait indefinitely
  while true; do
    sleep 1
  done
fi
