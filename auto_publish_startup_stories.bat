@echo off
setlocal
title PR Marketing Ventures - Startup Stories Automation Engine
cls

echo ===============================================================================
echo                PR MARKETING VENTURES - AUTOMATED STORIES ENGINE
echo ===============================================================================
echo.
echo   [1] Auto-Publish 2 Fresh Startup Stories (Instant 1-Click Discovery + Deploy)
echo   [2] Enter Custom Story URLs to Publish
echo   [3] Rebuild Next.js and Deploy Directly to Hostinger
echo   [4] Exit
echo.
echo ===============================================================================
choice /c 1234 /n /m "Press 1, 2, 3, or 4: "

if errorlevel 4 goto EXIT_PROMPT
if errorlevel 3 goto JUST_DEPLOY
if errorlevel 2 goto CUSTOM_URLS
if errorlevel 1 goto AUTO_TWO

:AUTO_TWO
cls
echo ===============================================================================
echo   RUNNING: Discovering 2 Fresh Stories, Cleaning Images, Backlinks and Deploy...
echo ===============================================================================
echo.
python "%~dp0backend\scripts\auto_publish_pipeline.py" --count 2
echo.
echo ===============================================================================
echo   AUTOMATION COMPLETE! All articles are live on prmarketingventures.com
echo ===============================================================================
pause
exit /b

:CUSTOM_URLS
cls
echo ===============================================================================
echo   PASTE TARGET STORY URLs (Comma-separated)
echo   Example: https://www.ceovine.com/story-1,https://www.ceovine.com/story-2
echo ===============================================================================
echo.
set /p custom_urls="Enter URLs: "
if "%custom_urls%"=="" (
    echo No URLs entered!
    pause
    exit /b
)
python "%~dp0backend\scripts\auto_publish_pipeline.py" --urls "%custom_urls%"
echo.
pause
exit /b

:JUST_DEPLOY
cls
echo ===============================================================================
echo   REBUILDING NEXT.JS AND DEPLOYING TO HOSTINGER...
echo ===============================================================================
echo.
npm --prefix "%~dp0website" run build
python "%~dp0deploy_to_hostinger.py"
echo.
pause
exit /b

:EXIT_PROMPT
exit /b
