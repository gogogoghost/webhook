
::卸载服务
@echo off
echo Uninstall start.
call node ./service.js uninstall
call npm uninstall node-windows -g
echo webhook has been uninstalled.
exit