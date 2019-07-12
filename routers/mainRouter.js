const Router=require('koa-router');
const logger=require('../libs/logger')
const config=require('../config');
const path=require('path');
const exec=require('child_process').exec;
const crypto=require('crypto-js');

const list=config.list||[];

function checkKeyGITEE(ctx,key) {
    return ctx.request.headers['x-gitee-token']==key;
}

function checkBranchGITEE(ctx,branch) {
    return ctx.request.body&&(ctx.request.body.ref||'').endsWith('/'+branch);
}

function checkKeyGITHUB(ctx,key){
    //logger(crypto.HmacSHA1(ctx.request.))
}

function checkBranchGITHUB(ctx,branch) {

}

const router=new Router();
router.post(config.path||'/post-receive',async(ctx)=>{
    console.log(ctx.request.body[Symbol('unparsedBody')]);
    for(let item of list){
        if(checkKeyGITEE(ctx,item.key)){
            //key校验通过，验证分支
            if(checkBranchGITEE(ctx,item.branch)){
                //属于本分支，开始执行
                const time=new Date().getTime();
                logger.info(`开始执行WebHook，任务：[${time}]`);
                (async ()=>{
                    exec(path.join(__dirname,'../scripts/'+item.script),(err,stdout,stderr)=>{
                        if(err){
                            logger.error(`任务[${time}]执行出错：\n${stderr}`);
                        }else{
                            logger.info(`任务[${time}]执行成功：\n${stdout}`);
                        }
                    })
                })();
            }
            ctx.response.status=200;
            return;
        }
    }
    ctx.response.status=403;

});

module.exports=router.routes();
