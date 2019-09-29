::安装服务
@echo off
echo Installation dependence.
call npm --registry https://registry.npm.taobao.org install node-windows -g 
call npm link node-windows 
call node ./service.js install
echo webhook has been installed.
exit
