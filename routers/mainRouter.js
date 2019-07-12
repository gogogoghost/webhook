const Router=require('koa-router');
const logger=require('../libs/logger')
const config=require('../config');

const router=new Router();
router.post('/post-receive',async(ctx)=>{
    if(ctx.request.headers['x-gitee-token']==config.key){
        //key校验通过
        if(ctx.request.body
            &&(ctx.request.body.ref||'').endsWith('/'+config.branch)){
            //属于本分支，开始执行
            logger.info('开始执行webhook');
        }
        ctx.response.status=200;
    }else{
        ctx.response.status=403;
    }
});

module.exports=router.routes();
