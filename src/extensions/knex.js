const config = require('../config');
const logger = require('../logger');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPasswd,
    database: config.dbName,
  },
  log: {
    warn(msg) {
      logger.warn(msg);
    },
    error(msg) {
      logger.error(msg);
    },
    deprecate(msg) {
      logger.info(msg);
    },
    debug(msg) {
      logger.debug(msg);
    },
  },
});

module.exports = knex;
