@echo off
title TechAndCarsInfo Blog Automation
cd /d "%~dp0"

echo ============================================
echo  TechAndCarsInfo Blog Automation
echo  %DATE% %TIME%
echo ============================================
echo.

:: Activate virtual environment
call venv\Scripts\activate
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment.
    pause
    exit /b 1
)

:: Run automation
python main.py
set EXIT_CODE=%errorlevel%

echo.
echo ============================================
if %EXIT_CODE% == 0 (
    echo  DONE - Check logs\blog.log for details
) else (
    echo  ERROR - Exit code: %EXIT_CODE%
    echo  Check logs\blog.log for details
)
echo  Finished: %DATE% %TIME%
echo ============================================
echo.
pause
