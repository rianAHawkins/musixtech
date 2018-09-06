@echo off
echo %time%
timeout 10> nul
echo %time%
node Server2.1.js
set "dummy="
set /p DUMMY=hit ENTER to countinue
