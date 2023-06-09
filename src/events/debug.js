const { Events } = require('discord.js');
const logger = require('../logger');

module.exports = {
  name: Events.Debug,
  once: false,
  execute(client, message) {
    logger.debug(message);
  },
};
