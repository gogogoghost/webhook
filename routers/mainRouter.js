const Router=require('koa-router');

const key='6cbc2339-f02a-4dbb-9087-b0bcc12ed229';

const router=new Router();
router.post('/post-receive',async(ctx)=>{
    if(ctx.request.body&&ctx.request.headers['X-Gitee-Token']==key){
        ctx.response.status=200;
    }else{
        ctx.response.status=403;
    }
    //console.log(ctx.request.body);
});

module.exports=router.routes();
