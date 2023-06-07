const { Events } = require('discord.js');
const logger = require('../logger');

module.exports = {
  name: Events.Warn,
  once: false,
  execute(message) {
    logger.warn(message);
  },
};
