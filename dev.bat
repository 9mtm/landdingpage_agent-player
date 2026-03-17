@echo off
set PORT=58391

echo Killing any process on port %PORT%...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%PORT% " ^| findstr "LISTENING"') do (
    echo Found process PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)

echo Starting dev server on port %PORT%...
cd /d "%~dp0"
npx next dev --port %PORT%
