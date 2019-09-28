#!/bin/sh
# 卸载服务

node ./service.js uninstall
npm uninstall node-windows -g
echo 'webhook has been uninstalled.'
pause


