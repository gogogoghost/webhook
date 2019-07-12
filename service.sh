#!/bin/sh

# ./service.sh install 安装服务
# ./service.sh uninstall 删除服务

serviceName="webhook";
serviceFile="$serviceName.service"

originFolder=$(cd `dirname $0`; pwd)
targetFile="/etc/systemd/system/$serviceFile"
pidFile="/run/$serviceName.pid"


if [ "$1" = "install" ]
then
  sudo cp $originFolder/$serviceFile $targetFile
  sudo sed -i "s?PATH?$originFolder?g" $targetFile
  echo "$serviceFile has been installed."
elif [ "$1" = "uninstall" ]
then
  sudo rm $targetFile
  echo "$serviceFile has been uninstalled."
elif [ "$1" = "start" ]
then
  cd $originFolder
  nohup sh -c "npm start" > /dev/null & echo $! > $pidFile
elif [ "$1" = "stop" ]
then
  kill -9 $(cat $pidFile)
fi
