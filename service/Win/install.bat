# 安装服务

echo 'Installation dependence.'
npm --registry https://registry.npm.taobao.org install node-windows -g
npm link node-windows
node ./service.js install
echo 'webhook has been installed.'
pause
