# Secure College - PowerShell Setup Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Secure College - Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking for Node.js..." -ForegroundColor Yellow
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue

if ($nodeCommand) {
    Write-Host "[OK] Node.js is installed" -ForegroundColor Green
    node --version
    npm --version
    Write-Host ""
    
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    
    Write-Host ""
    Write-Host "Setup complete! Starting development server..." -ForegroundColor Green
    Write-Host ""
    Write-Host "Opening http://localhost:3000 in your browser..." -ForegroundColor Yellow
    
    Start-Process "http://localhost:3000"
    npm run dev
} else {
    Write-Host "[ERROR] Node.js is NOT installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Download the LTS version and follow the installation wizard" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After installation, close this window and run setup.ps1 again" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
}

