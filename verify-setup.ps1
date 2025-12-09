# Blog Platform - Setup Verification
# This script verifies your system is ready to run the application

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Blog Platform - Setup Verification" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

$allChecks = @()

# Check 1: Docker Installation
Write-Host "[1/6] Checking Docker..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  [OK] Docker is installed: $dockerVersion" -ForegroundColor Green
        $allChecks += $true
    } else {
        Write-Host "  [FAIL] Docker is not installed or not in PATH" -ForegroundColor Red
        Write-Host "    Download from: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
        $allChecks += $false
    }
} catch {
    Write-Host "  [FAIL] Docker is not installed" -ForegroundColor Red
    $allChecks += $false
}

# Check 2: Docker Compose
Write-Host ""
Write-Host "[2/6] Checking Docker Compose..." -ForegroundColor Yellow
try {
    $composeVersion = docker-compose --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  [OK] Docker Compose is installed: $composeVersion" -ForegroundColor Green
        $allChecks += $true
    } else {
        Write-Host "  [FAIL] Docker Compose is not available" -ForegroundColor Red
        $allChecks += $false
    }
} catch {
    Write-Host "  [FAIL] Docker Compose is not installed" -ForegroundColor Red
    $allChecks += $false
}

# Check 3: Required Files
Write-Host ""
Write-Host "[3/6] Checking required files..." -ForegroundColor Yellow
$requiredFiles = @(
    "docker-compose.yml",
    "docker-compose.hub.yml",
    "database/init.sql",
    "backend/Dockerfile",
    "frontend/Dockerfile"
)

$filesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  [OK] Found: $file" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] Missing: $file" -ForegroundColor Red
        $filesExist = $false
    }
}
$allChecks += $filesExist

# Check 4: Port Availability
Write-Host ""
Write-Host "[4/6] Checking port availability..." -ForegroundColor Yellow
$ports = @(80, 3306, 5000)
$portsAvailable = $true

foreach ($port in $ports) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connection) {
        Write-Host "  [WARN] Port $port is in use (required for application)" -ForegroundColor Red
        $portsAvailable = $false
    } else {
        Write-Host "  [OK] Port $port is available" -ForegroundColor Green
    }
}
$allChecks += $portsAvailable

# Check 5: Docker Service Running
Write-Host ""
Write-Host "[5/6] Checking Docker service status..." -ForegroundColor Yellow
try {
    $dockerInfo = docker info 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  [OK] Docker service is running" -ForegroundColor Green
        $allChecks += $true
    } else {
        Write-Host "  [FAIL] Docker service is not running" -ForegroundColor Red
        Write-Host "    Start Docker Desktop application" -ForegroundColor Yellow
        $allChecks += $false
    }
} catch {
    Write-Host "  [FAIL] Cannot connect to Docker service" -ForegroundColor Red
    $allChecks += $false
}

# Check 6: Internet Connection
Write-Host ""
Write-Host "[6/6] Checking internet connectivity..." -ForegroundColor Yellow
try {
    $ping = Test-Connection -ComputerName hub.docker.com -Count 1 -Quiet -ErrorAction SilentlyContinue
    if ($ping) {
        Write-Host "  [OK] Internet connection available (can pull from Docker Hub)" -ForegroundColor Green
        $allChecks += $true
    } else {
        Write-Host "  [INFO] Cannot reach Docker Hub (hub.docker.com)" -ForegroundColor Yellow
        Write-Host "    You can still build locally with: docker-compose up --build" -ForegroundColor Yellow
        $allChecks += $true
    }
} catch {
    Write-Host "  [INFO] Network check skipped" -ForegroundColor Yellow
    $allChecks += $true
}

# Summary
Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

$passedChecks = ($allChecks | Where-Object { $_ -eq $true }).Count
$totalChecks = $allChecks.Count

if ($passedChecks -eq $totalChecks) {
    Write-Host "[SUCCESS] All checks passed! ($passedChecks/$totalChecks)" -ForegroundColor Green
    Write-Host ""
    Write-Host "You are ready to run the application!" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Quick Start Options:" -ForegroundColor Cyan
    Write-Host "------------------------------------" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Use Docker Hub (Fastest):" -ForegroundColor Yellow
    Write-Host "   docker-compose -f docker-compose.hub.yml up" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Build Locally (Development):" -ForegroundColor Yellow
    Write-Host "   docker-compose up --build" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Access Application:" -ForegroundColor Yellow
    Write-Host "   http://localhost" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "[FAILED] Some checks failed ($passedChecks/$totalChecks passed)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please fix the issues above before running the application." -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "Common Solutions:" -ForegroundColor Cyan
    Write-Host "------------------------------------" -ForegroundColor Cyan
    Write-Host "- Install Docker Desktop: https://www.docker.com/products/docker-desktop" -ForegroundColor White
    Write-Host "- Start Docker Desktop application" -ForegroundColor White
    Write-Host "- Close applications using ports 80, 3306, or 5000" -ForegroundColor White
    Write-Host "- Ensure you are in the blog-site directory" -ForegroundColor White
    Write-Host ""
}

# Additional Info
Write-Host "Need Help?" -ForegroundColor Cyan
Write-Host "------------------------------------" -ForegroundColor Cyan
Write-Host "- Read QUICKSTART.md for step-by-step guide" -ForegroundColor White
Write-Host "- Read DEPLOYMENT_OPTIONS.md for deployment methods" -ForegroundColor White
Write-Host "- Read TROUBLESHOOTING.md for common issues" -ForegroundColor White
Write-Host "- Check logs: docker-compose logs" -ForegroundColor White
Write-Host ""
