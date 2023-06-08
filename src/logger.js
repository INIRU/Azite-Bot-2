const { createLogger, format, transports } = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const path = require('node:path');

const logPath = path.join(__dirname, '../logs');

/** Logger */
const logger = createLogger({
  transports: [
    new winstonDaily({
      datePattern: 'YYYY-MM-DD',
      dirname: logPath,
      filename: '%DATE%.log',
      maxFiles: 30,
      zippedArchive: true,
    }),
    new transports.Console(),
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `${[timestamp]} ${level}: ${message}`;
    })
  ),
});

module.exports = logger;
