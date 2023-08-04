const { Events, ChannelType } = require('discord.js');
const logger = require('../logger');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (interaction.user.bot) return;
    if (interaction.channel.type == ChannelType.DM) {
      logger.info(`${interaction.user} is DM Interaction`);
      await interaction.reply('**DM**은 지원하지 않습니다.');
    }

    /** Button Inputs */

    

    /** Slash Commands Inputs */
    if (interaction.isChatInputCommand()) {
      Error.prototype.interaction = interaction;
      logger.info(
        `Command: ${interaction.user.id} - ${
          interaction.commandName
        } ${JSON.stringify(interaction.options.data)}`
      );
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        await interaction.reply(
          `**\`${interaction.commandName}\`**는\\(은) 등록되지 않은 명령어 입니다.`
        );
        logger.warn(`${interaction.commandName} is not found.`);
        return;
      }

      await command.execute(interaction);
    }
  },
};
