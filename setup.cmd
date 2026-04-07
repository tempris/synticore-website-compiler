@echo off
setlocal
cd /d "%~dp0"

echo [Setup] Installing npm dependencies...
call npm install
if errorlevel 1 exit /b %errorlevel%

echo [Setup] Complete.
