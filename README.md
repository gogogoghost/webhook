## gitee专用webhook

### 使用方法

```bash
git clone https://github.com/gogogoghost/webhook

cd webhook

npm i
```

打开config.json，将key改为后台设置的密码，branch修改为需要监控的分支：

```json
{
  "key": "6cbc2339-f02a-4dbb-9087-b0bcc12ed229",
  "branch": "master"
}
```

编辑post-receive.sh，在收到回调时，该脚本会被执行：

```
vim post-receive.sh

chmod +x post-receive.sh
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
