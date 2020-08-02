const { createLogger, format, transports } = require('winston');

exports.logger = createLogger({
  level: process.env.LOG_LEVEL.toLowerCase(),
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
  ],
});
