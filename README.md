# git webhook
[![gitee](https://img.shields.io/badge/gitee-support-red)](https://gitee.com)   [![github](https://img.shields.io/badge/github-support-green)](https://github.com)  [![gitbucket](https://img.shields.io/badge/gitbucket-support-blue)](https://github.com/gitbucket/gitbucket) 

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
- site gitee/github/gitbucket，不写则该条配置无效
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
  },{
    "key": "764daf6f-497b-46ff-b734-49ad37d88517",
    "branch": "dev",
    "script": "projectC.sh",
    "site": "gitbucket"
  }],
  "port":6666,
  "path": "/post-receive"
}

```

### 编写脚本：

- Linux

```bash
cd scripts
mv sample.sh projectA.sh
vim projectA.sh
chmod +x projectA.sh
```

- window

在`scripts`目录下新增个bat脚本文件

### 临时启动：

```bash
npm start
```

### 作为服务启动：

- Linux 

```bash
cd service/Linux

./service.sh install/uninstall

sudo systemctl start/stop webhook
```
- window

  进入`service/Win`目录，install.bat与uninstall.bat即为安装卸载脚本

### 日志

存放在根目录下的`logs`下