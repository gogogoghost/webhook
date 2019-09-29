# git webhook ![node](https://img.shields.io/badge/node-v7.6.0-brightgreen) ![npm](https://img.shields.io/badge/npm-v2.0-blue)  
![gitee](https://img.shields.io/badge/gitee-support-red)   ![github](https://img.shields.io/badge/github-support-green)  ![gitbucket](https://img.shields.io/badge/gitbucket-support-blue) 

支持:
+ gitee
+ github
+ gitbucket

## 使用方法

### 需要提前安装node npm

```bash
git clone https://github.com/gogogoghost/webhook

cd webhook

npm i
```

### 打开config.json，默认配置如下

- key 后台设置的密码
- branch 需要监控的分支
- script scripts目录下的脚本文件名
- site gitee/github/gitbucket，不写则该条无效
---
- port http端口(不写默认6666)
- path post接口的路径(不写默认/post-receive)

```json
{
  "list": [{
    "key": "6cbc2339-f02a-4dbb-9087-b0bcc12ed229",
    "branch": "master",
    "script": "projectA.sh",
    "site": "github"
  },{
    "key": "369d87fe-e94a-4105-9c0e-b913cf011d8f",
    "branch": "dev",
    "script": "projectB.sh",
    "site": "gitee"
  }],
  "port":6666,
  "path": "/post-receive"
}

```

### 编写脚本：

Linux

```bash
cd scripts
mv sample.sh projectA.sh
vim projectA.sh
chmod +x projectA.sh
```

window

在`scripts`目录下新增个bat脚本文件



### 临时启动：

```bash
npm start
```

### 作为服务启动：
Linux 
进入根目录下的`service/Linux`执行以下
```bash
./service.sh install/uninstall

sudo systemctl start/stop/restart webhook
```
window
进入根目录下的`service/Win`执行以下

```bash
#安装服务(双击运行)
./install.bat

#卸载服务(双击运行)
./uninstall.bat
```

### 日志
存放在根目录下的`logs`下