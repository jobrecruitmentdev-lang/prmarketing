@echo off
title PR Marketing Ventures - Dual Topic Publisher (1 Startup + 1 Marketing Strategy)
color 0A

echo ==============================================================================
echo   PR MARKETING VENTURES - DUAL TOPIC PUBLISHER
echo   [1 Startup ^& Innovation + 1 Marketing Strategy]
echo ==============================================================================
echo.

cd /d "C:\hk\prmarketing\blog_automation"

if not exist "venv\Scripts\python.exe" (
    echo [ERROR] Virtual environment not found at C:\hk\prmarketing\blog_automation\venv
    pause
    exit /b 1
)

.\venv\Scripts\python.exe publish_pair.py %*

echo.
echo ==============================================================================
echo   DUAL PUBLISHING COMPLETE!
echo   Visit your live hub: https://prmarketingventures.com/startup-stories/
echo ==============================================================================
echo.
pause
