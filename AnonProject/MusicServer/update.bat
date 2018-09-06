@echo off
echo %time%
timeout 30> nul
echo %time%
git pull
echo %time%
timeout 10> nul
echo %time%
node Server2.1.js