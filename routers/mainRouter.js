const Router=require('koa-router');
const logger=require('../libs/logger')
const config=require('../config');
const path=require('path');
const exec=require('child_process').exec;

const router=new Router();
router.post('/post-receive',async(ctx)=>{
    if(ctx.request.headers['x-gitee-token']==config.key){
        //key校验通过
        if(ctx.request.body
            &&(ctx.request.body.ref||'').endsWith('/'+config.branch)){
            //属于本分支，开始执行
            const time=new Date().getTime();
            logger.info('开始执行WebHook，任务：'+time);
            exec(path.join(__dirname,'../post-receive.sh'),(err,stdout,stderr)=>{
                if(err){
                    logger.error('任务'+time+'执行出错：\n'+stderr);
                }else{
                    logger.info('任务'+time+'执行结束：\n'+stdout);
                }
            })
        }
        ctx.response.status=200;
    }else{
        ctx.response.status=403;
    }
});

module.exports=router.routes();
