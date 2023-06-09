const { Events } = require('discord.js');
const logger = require('../logger');

module.exports = {
  name: Events.Warn,
  once: false,
  execute(client, message) {
    logger.warn(message);
  },
};
