const { Events } = require('discord.js');
const logger = require('../logger');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    if (!client.isReady()) return;

    logger.info(`${client.user.tag} is now online!`);
  },
};
