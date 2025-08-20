const logger = require('./logger');

const requestLogger = (req, res, next) => {
  const start = Date.now();
  logger.info(`Incoming Request: ${req.method} ${req.originalUrl}`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    if (status >= 500) {
      logger.error(
        `❌ ${req.method} ${req.originalUrl} | Status: ${status} | ${duration}ms`
      );
    } else if (status >= 400) {
      logger.warn(
        `⚠️ ${req.method} ${req.originalUrl} | Status: ${status} | ${duration}ms`
      );
    } else {
      logger.info(
        `✅ ${req.method} ${req.originalUrl} | Status: ${status} | ${duration}ms`
      );
    }
  });

  next();
};

module.exports = requestLogger;
