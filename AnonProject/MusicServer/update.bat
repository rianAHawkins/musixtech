@echo off
echo update bat
echo git pull

echo %time%
timeout 10> nul
echo %time%

git pull

echo %time%
timeout 10> nul
echo %time%
start server
exit