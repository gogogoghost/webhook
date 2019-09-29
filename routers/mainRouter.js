const Router = require('koa-router');
const logger = require('../libs/logger');
const config = require('../config');
const path = require('path');
const exec = require('child_process').exec;
const crypto = require('crypto-js');

const list = config.list || [];

function checkKeyGITEE(ctx, key) {
    return ctx.request.headers['x-gitee-token'] == key;
}

function checkBranch(ctx, branch) {
    return ctx.request.body && (ctx.request.body.ref || '').endsWith('/' + branch);
}

function checkKeyGITHUB(ctx, key) {
    const sign = 'sha1=' + crypto.HmacSHA1(ctx.request.body[Symbol.for('unparsedBody')], key);
    return ctx.request.headers['x-hub-signature'] == sign;
}

const router = new Router();
router.post(config.path || '/post-receive', async (ctx) => {
    for (let item of list) {
        let func;
        if (item.site == 'github') {
            func = checkKeyGITHUB;
        } else if (item.site == 'gitee') {
            func = checkKeyGITEE;
        } else if (item.site == 'gitbucket') {
            func = checkKeyGITHUB;
        } else {
            continue;
        }
        if (func(ctx, item.key)) {
            //key校验通过，验证分支
            if (checkBranch(ctx, item.branch)) {
                //属于本分支，开始执行
                const time = new Date().getTime();
                //发送者
                const user = (ctx.request.body && ctx.request.body.sender && ctx.request.body.sender.login) || '';
                logger.info(`sender：[${user}]，开始执行WebHook，任务：[${time}]`);
                (async () => {
                    exec(path.join(__dirname, '../scripts/' + item.script), (err, stdout, stderr) => {
                        if (err) {
                            logger.error(`任务[${time}]执行出错：${stderr}`);
                        } else {
                            logger.info(`任务[${time}]执行成功：${stdout}`);
                        }
                    });
                })();
            }
            ctx.response.status = 200;
            return;
        }
    }
    ctx.response.status = 403;

});

module.exports = router.routes();
