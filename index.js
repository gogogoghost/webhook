const logger=require('./libs/logger');
const Koa=require('koa');
const Body=require('koa-body');
const fs=require('fs');

const app=new Koa();

app.use(Body());

try{
    let routesList=fs.readdirSync('routers');
    for(let item of routesList){
        const subRouter=require('./routers/'+item);
        app.use(subRouter);
    }
    app.listen(8080);
    logger.info('服务启动完成');
}catch (e) {
    logger.error('服务启动失败：'+e);
}
