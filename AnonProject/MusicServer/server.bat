@echo off
echo server bat
echo starting server

:loop
tasklist /FI "IMAGENAME eq Server.exe" 2>NUL | find /I /N "Server.exe">NUL
if "%ERRORLEVEL%"=="0" (echo %time% still going)
if "%ERRORLEVEL%" NEQ "0" (
echo starting program
start Server.exe
)
timeout 240>NUL
goto loop
exit
