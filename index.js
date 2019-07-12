const logger=require('./libs/logger');
const Koa=require('koa');
const body=require('koa-body');
const config=require('./config');
const fs=require('fs');

const app=new Koa();

app.use(body({
    includeUnparsed:true
}));

try{
    let routesList=fs.readdirSync('routers');
    for(let item of routesList){
        const subRouter=require('./routers/'+item);
        app.use(subRouter);
    }
    app.listen(config.port||6666);
    logger.info('服务启动完成');
}catch (e) {
    logger.error('服务启动失败：'+e);
}
