const { Events } = require('discord.js');
const { contentBuilder } = require('../extensions');
const logger = require('../logger');

module.exports = {
  name: Events.Error,
  once: false,
  async execute(error) {
    const errorLogChannel = interaction.client.channels.cache.get(
      config.errlogchId
    );
    const uuid = uuidv4();
    const reponse = contentBuilder(interaction, 'InteractionErrorUser', {
      id: uuid,
      error: error,
    });
    logger.error(`${uuid}\n${error.stack}`);
    if (interaction.replied || interaction.deferred) {
      await interaction.reply(reponse);
    } else await interaction.reply(reponse);
    const reponseDev = contentBuilder(interaction, 'InteractionErrorDev', {
      id: uuid,
      error: error,
    });
    return await errorLogChannel.send(reponseDev);
  },
};
