@echo off
title Secure College Dev Server
echo ========================================
echo   Secure College Development Server
echo ========================================
echo.
echo IMPORTANT: DO NOT CLOSE THIS WINDOW
echo Website: http://localhost:3000
echo Press Ctrl+C to stop
echo.
cd /d "%~dp0"
echo Starting server...
npm run dev