## git webhook

暂只支持码云

### 使用方法

需要提前安装node npm

```bash
git clone https://github.com/gogogoghost/webhook

cd webhook

npm i
```

打开config.json
- key 后台设置的密码
- branch 需要监控的分支
- script scripts目录下的脚本文件名

```json
{
  "list": [{
    "key": "6cbc2339-f02a-4dbb-9087-b0bcc12ed229",
    "branch": "master",
    "script": "projectA.sh"
  },{
    "key": "369d87fe-e94a-4105-9c0e-b913cf011d8f",
    "branch": "dev",
    "script": "projectB.sh"
  }]
}

```

临时启动：

```bash
npm start
```

作为服务启动：
```bash
./service.sh install/uninstall

sudo systemctl start/stop webhook
```
