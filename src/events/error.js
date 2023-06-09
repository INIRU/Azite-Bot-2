const { Events } = require('discord.js');
const logger = require('../logger');

module.exports = {
  name: Events.Error,
  once: false,
  execute(error) {
    logger.error(error.stack);
  },
};
