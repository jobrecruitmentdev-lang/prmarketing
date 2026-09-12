@echo off
:: Silent version for Windows Task Scheduler — no pause at end
cd /d "%~dp0"
call venv\Scripts\activate
python main.py
exit /b %errorlevel%
