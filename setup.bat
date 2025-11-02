@echo off
echo ========================================
echo Secure College - Setup Script
echo ========================================
echo.

echo Checking for Node.js...
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js is installed
    node --version
    npm --version
    echo.
    echo Installing dependencies...
    call npm install
    echo.
    echo Setup complete! Starting development server...
    echo.
    echo Opening http://localhost:3000 in your browser...
    start http://localhost:3000
    call npm run dev
) else (
    echo [ERROR] Node.js is NOT installed
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version and follow the installation wizard
    echo.
    echo After installation, close this window and run setup.bat again
    echo.
    pause
)

