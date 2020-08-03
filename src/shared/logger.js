const { createLogger, format, transports } = require('winston');

exports.logger = createLogger({
  level: process.env.LOG_LEVEL.toLowerCase(),
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.json(),
  ),
  defaultMeta: { service: 'cashback' },
  transports: [
    new transports.Console(),
  ],
});
