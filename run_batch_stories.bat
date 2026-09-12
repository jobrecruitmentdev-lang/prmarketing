@echo off
title PR Marketing Ventures - Startup Stories Publisher (2 Stories Batch)
color 0A

echo ==============================================================================
echo   PR MARKETING VENTURES - 2-STORY BATCH AUTOMATION RUNNER
echo   Startup, Innovation ^& Market Strategy HD Publishing Engine
echo ==============================================================================
echo.

cd /d "C:\hk\prmarketing\blog_automation"

if not exist "venv\Scripts\python.exe" (
    echo [ERROR] Virtual environment not found at C:\hk\prmarketing\blog_automation\venv
    echo Please ensure the venv is created.
    pause
    exit /b 1
)

echo [INFO] Starting automated publishing for 2 pending stories from Google Sheet...
echo.

.\venv\Scripts\python.exe main.py --batch 2

echo.
echo ==============================================================================
echo   BATCH EXECUTION FINISHED!
echo   Check your live hub: https://prmarketingventures.com/startup-stories/
echo ==============================================================================
echo.
pause
