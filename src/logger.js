const { createLogger, format, transports } = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const path = require('node:path');

const logPath = path.join(__dirname, '../logs');
const logFormat = format.printf(({ timestamp, level, message }) => {
  return `${[timestamp]} [${level}] ${message}`;
});

/** Logger */
const logger = createLogger({
  transports: [
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logPath,
      filename: '%DATE%.log',
      maxFiles: 30,
      zippedArchive: true,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      ),
    }),
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      ),
    }),
  ],
});

module.exports = logger;
