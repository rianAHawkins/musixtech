@echo off
echo server bat
echo starting server

echo %time%
timeout 10> nul
echo %time%

node Server2.1.js

echo exiting in 10
echo %time%
timeout 5> nul
echo %time%
echo exiting in 5
echo %time%
timeout 5> nul
echo %time%
exit


