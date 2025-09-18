const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const path = require('path');

// custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// create logger
const logger = createLogger({
  level: 'info', // default level
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // Console logs (colored)
    new transports.Console({
      format: combine(colorize(), timestamp(), logFormat)
    }),

    // File logs
    new transports.File({
      filename: path.join(__dirname, 'error.log'),
      level: 'error'
    }),
    new transports.File({
      filename: path.join(__dirname, 'success.log'),
      level: 'info'
    }),
    new transports.File({
      filename: path.join(__dirname, 'failed.log'),
      level: 'warn'
    })
  ]
});

module.exports = logger;
