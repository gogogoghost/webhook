const log4js = require('log4js');

log4js.configure({
    appenders: { webhook: { type: 'file', filename: './logs/default.log' } },
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
