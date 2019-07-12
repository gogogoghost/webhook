function addTime(msg){
    return new Date().toLocaleString()+' '+msg
}

module.exports={
    info(msg){
        console.log(addTime(msg));
    },
    error(msg){
        console.log('\033[31m'+addTime(msg)+'\033[39m');
    }
}
