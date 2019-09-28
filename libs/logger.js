const log4js = require('log4js');
const path = require('path');

log4js.configure({
    appenders: { webhook: { type: 'file', filename: path.join(__dirname,'../logs/default.log') } },
    categories: { default: { appenders: ['webhook'], level: 'info' } }
});
const logger = log4js.getLogger('webhook');

module.exports = {
    info(msg) {
        logger.info(msg);
    },
    error(msg) {
        logger.error(msg);
    }
};
