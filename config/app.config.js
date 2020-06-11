const logger = require('morgan');

const PORT = process.env.PORT || 13002;

module.exports = {
    PORT,
    logger: logger('dev')
}