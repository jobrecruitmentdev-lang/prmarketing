@echo off
setlocal enabledelayedexpansion
title PR Marketing Ventures - Instant Search Engine Indexing Engine
cls

:MENU
cls
echo ===============================================================================
echo            PR MARKETING VENTURES - INSTANT SEARCH ENGINE INDEXING
echo ===============================================================================
echo.
echo   [1] Push Entire Sitemap to Google Indexing API (All 85+ URLs)
echo   [2] Push Single Custom URL to Google (Instant Fast-Track Indexing)
echo   [3] Push Sitemap to IndexNow (Bing, Yandex, Yahoo, Naver)
echo   [4] TURBO COMBO: Push Google GSC + IndexNow Together (1-Click)
echo   [5] Exit
echo.
echo ===============================================================================
choice /c 12345 /n /m "Select option [1, 2, 3, 4, 5]: "

if errorlevel 5 goto EXIT_SCRIPT
if errorlevel 4 goto TURBO_COMBO
if errorlevel 3 goto INDEXNOW_ONLY
if errorlevel 2 goto SINGLE_URL
if errorlevel 1 goto GSC_SITEMAP

:GSC_SITEMAP
cls
echo ===============================================================================
echo   [GOOGLE SEARCH CONSOLE] Pushing all sitemap URLs via Indexing API...
echo ===============================================================================
echo.
python "%~dp0submit_gsc.py"
echo.
echo ===============================================================================
echo   GOOGLE INDEXING NOTIFICATION COMPLETED!
echo ===============================================================================
pause
goto MENU

:SINGLE_URL
cls
echo ===============================================================================
echo   ENTER CUSTOM PAGE URL FOR INSTANT GOOGLE INDEXING
echo   Example: https://prmarketingventures.com/pr-agency-in-ahmedabad/
echo ===============================================================================
echo.
set /p target_url="Enter full URL: "
if "!target_url!"=="" (
    echo.
    echo [ERROR] No URL entered! Returning to menu.
    pause
    goto MENU
)
echo.
echo Pushing: !target_url!
python "%~dp0submit_gsc.py" "!target_url!"
echo.
echo ===============================================================================
echo   SINGLE URL SUBMISSION COMPLETED!
echo ===============================================================================
pause
goto MENU

:INDEXNOW_ONLY
cls
echo ===============================================================================
echo   [INDEXNOW] Pushing sitemap URLs to Bing, Yandex, Yahoo, Naver...
echo ===============================================================================
echo.
python "%~dp0submit_indexnow.py"
echo.
echo ===============================================================================
echo   INDEXNOW PING COMPLETED!
echo ===============================================================================
pause
goto MENU

:TURBO_COMBO
cls
echo ===============================================================================
echo   [TURBO COMBO] Running Full 1-Click Multi-Engine Indexing Push...
echo ===============================================================================
echo.
echo Step 1/2: Submitting to IndexNow (Bing, Yandex, Yahoo)...
python "%~dp0submit_indexnow.py"
echo.
echo -------------------------------------------------------------------------------
echo Step 2/2: Submitting to Google Search Console Indexing API...
python "%~dp0submit_gsc.py"
echo.
echo ===============================================================================
echo   TURBO INDEXING COMPLETED! All engines notified.
echo ===============================================================================
pause
goto MENU

:EXIT_SCRIPT
echo.
echo Exiting. Have a great day!
exit /b
