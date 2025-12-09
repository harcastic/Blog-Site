#!/bin/bash
# Blog Platform - Setup Verification (Linux/Mac)

echo ""
echo "===================================="
echo "Blog Platform - Setup Verification"
echo "===================================="
echo ""

all_checks=()

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check 1: Docker Installation
echo -e "${YELLOW}[1/6] Checking Docker...${NC}"
if command -v docker &> /dev/null; then
    docker_version=$(docker --version)
    echo -e "  ${GREEN}✓ Docker is installed: $docker_version${NC}"
    all_checks+=("pass")
else
    echo -e "  ${RED}✗ Docker is not installed${NC}"
    echo -e "    ${YELLOW}Download from: https://www.docker.com/products/docker-desktop${NC}"
    all_checks+=("fail")
fi

# Check 2: Docker Compose
echo -e "\n${YELLOW}[2/6] Checking Docker Compose...${NC}"
if command -v docker-compose &> /dev/null; then
    compose_version=$(docker-compose --version)
    echo -e "  ${GREEN}✓ Docker Compose is installed: $compose_version${NC}"
    all_checks+=("pass")
else
    echo -e "  ${RED}✗ Docker Compose is not installed${NC}"
    all_checks+=("fail")
fi

# Check 3: Required Files
echo -e "\n${YELLOW}[3/6] Checking required files...${NC}"
required_files=(
    "docker-compose.yml"
    "docker-compose.hub.yml"
    "database/init.sql"
    "backend/Dockerfile"
    "frontend/Dockerfile"
)

files_exist=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓ Found: $file${NC}"
    else
        echo -e "  ${RED}✗ Missing: $file${NC}"
        files_exist=false
    fi
done

if [ "$files_exist" = true ]; then
    all_checks+=("pass")
else
    all_checks+=("fail")
fi

# Check 4: Port Availability
echo -e "\n${YELLOW}[4/6] Checking port availability...${NC}"
ports=(80 3306 5000)
ports_available=true

for port in "${ports[@]}"; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 || netstat -tuln 2>/dev/null | grep ":$port " >/dev/null; then
        echo -e "  ${RED}✗ Port $port is in use (required for application)${NC}"
        ports_available=false
    else
        echo -e "  ${GREEN}✓ Port $port is available${NC}"
    fi
done

if [ "$ports_available" = true ]; then
    all_checks+=("pass")
else
    all_checks+=("fail")
fi

# Check 5: Docker Service Running
echo -e "\n${YELLOW}[5/6] Checking Docker service status...${NC}"
if docker info &> /dev/null; then
    echo -e "  ${GREEN}✓ Docker service is running${NC}"
    all_checks+=("pass")
else
    echo -e "  ${RED}✗ Docker service is not running${NC}"
    echo -e "    ${YELLOW}Start Docker Desktop or Docker daemon${NC}"
    all_checks+=("fail")
fi

# Check 6: Internet Connection
echo -e "\n${YELLOW}[6/6] Checking internet connectivity...${NC}"
if ping -c 1 hub.docker.com &> /dev/null; then
    echo -e "  ${GREEN}✓ Internet connection available (can pull from Docker Hub)${NC}"
    all_checks+=("pass")
else
    echo -e "  ${YELLOW}⚠ Cannot reach Docker Hub (hub.docker.com)${NC}"
    echo -e "    ${YELLOW}You can still build locally with: docker-compose up --build${NC}"
    all_checks+=("pass")  # Not critical
fi

# Summary
echo -e "\n===================================="
echo -e "Summary"
echo -e "===================================="
echo ""

passed_checks=$(echo "${all_checks[@]}" | grep -o "pass" | wc -l)
total_checks=${#all_checks[@]}

if [ "$passed_checks" -eq "$total_checks" ]; then
    echo -e "${GREEN}✓ All checks passed! ($passed_checks/$total_checks)${NC}"
    echo -e "\n${GREEN}You're ready to run the application!${NC}\n"
    
    echo -e "${CYAN}Quick Start Options:${NC}"
    echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "\n${YELLOW}1. Use Docker Hub (Fastest):${NC}"
    echo -e "   docker-compose -f docker-compose.hub.yml up"
    echo -e "\n${YELLOW}2. Build Locally (Development):${NC}"
    echo -e "   docker-compose up --build"
    echo -e "\n${YELLOW}3. Access Application:${NC}"
    echo -e "   http://localhost"
    echo ""
else
    echo -e "${RED}✗ Some checks failed ($passed_checks/$total_checks passed)${NC}"
    echo -e "\n${YELLOW}Please fix the issues above before running the application.${NC}\n"
    
    echo -e "${CYAN}Common Solutions:${NC}"
    echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "• Install Docker: https://www.docker.com/products/docker-desktop"
    echo -e "• Start Docker service: sudo systemctl start docker"
    echo -e "• Close applications using ports 80, 3306, or 5000"
    echo -e "• Ensure you're in the blog-site directory"
    echo ""
fi

# Additional Info
echo -e "${CYAN}Need Help?${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "• Read QUICKSTART.md for step-by-step guide"
echo -e "• Read DEPLOYMENT_OPTIONS.md for deployment methods"
echo -e "• Read TROUBLESHOOTING.md for common issues"
echo -e "• Check logs: docker-compose logs"
echo ""
