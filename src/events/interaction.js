const { Events, ChannelType } = require('discord.js');
const { v4: uuidv4 } = require('uuid');
const logger = require('../logger');
const { contentBuilder } = require('../extensions');
const config = require('../config');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (interaction.user.bot) return;
    if (interaction.channel.type == ChannelType.DM) {
      logger.info(`${interaction.user} is DM Interaction`);
      await interaction.reply('**DM**은 지원하지 않습니다.');
    }

    /**Slash Commands Input */
    if (interaction.isChatInputCommand()) {
      logger.info(
        `Command: ${interaction.user.id} - ${
          interaction.commandName
        } ${JSON.stringify(interaction.options.data)}`
      );
      const command = interaction.client.commands.get(interaction.commandName);

      // if (!command) {
      //   await interaction.reply(
      //     `**\`${interaction.commandName}\`**는\(은) 등록되지 않은 명령어 입니다.`
      //   );
      //   logger.warn(`${interaction.commandName} is not found.`);
      //   return;
      // }

      try {
        await command.execute(interaction);
      } catch (e) {
        const errorLogChannel = interaction.client.channels.cache.get(
          config.errlogchId
        );
        const uuid = uuidv4();
        const reponse = contentBuilder(interaction, 'slashErrorUser', {
          id: uuid,
          error: e,
        });
        logger.error(`${uuid}\n${e.stack}`);
        if (interaction.replied || interaction.deferred) {
          await interaction.reply(reponse);
        } else await interaction.reply(reponse);
        const reponseDev = contentBuilder(interaction, 'slashErrorDev', {
          id: uuid,
          error: e,
        });
        return await errorLogChannel.send(reponseDev);
      }
    }
  },
};
