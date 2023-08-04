const { Events, EmbedBuilder } = require('discord.js');
const { v4: uuidv4 } = require('uuid');
const logger = require('../logger');

module.exports = {
  name: Events.Error,
  once: false,
  async execute(error) {
    if (error.interaction != null) {
      const errorLogChannel = error.interaction.client.channels.cache.get(
        error.client.config.errlogchId
      );
      const uuid = uuidv4();

      /** User Error Message */
      const userEmbed = new EmbedBuilder()
        .setTitle(error.client.local.bot.error.user.title)
        .setDescription(
          error.client.local.bot.error.user.desc.bind({
            id: uuid,
            ename: error.name,
            emsg: error.message,
          })
        )
        .setTimestamp()
        .setFooter({
          text: error.interaction.user.tag,
          iconURL: error.interaction.user.avatarURL(),
        });

      /** Developer Error Log Message */
      const devEmbed = new EmbedBuilder()
        .setTitle(error.client.local.bot.error.developer.title)
        .addFields({
          name: error.client.local.bot.error.developer.infomation.name,
          value: error.client.local.bot.error.developer.infomation.value.bind({
            id: uuid,
            user: error.interaction.user.id,
            channel: error.interaction.channel.id,
            guild: error.interaction.guild.id,
            perms: error.interaction.guild.members.me.permissions.bitfield,
          }),
          inline: error.client.local.bot.error.developer.infomation.inline,
        })
        .addFields({
          name: error.client.local.bot.error.developer.error.name,
          value: error.client.local.bot.error.developer.error.value.bind({
            error: error,
          }),
        })
        .setTimestamp()
        .setFooter({
          text: error.interaction.user.tag,
          iconURL: error.interaction.user.avatarURL(),
        });
      await error.interaction.reply({ embeds: [userEmbed], ephemeral: true });
      await errorLogChannel.send({ embeds: [devEmbed] });
      return (Error.prototype.interaction = null);
    } else logger.error(error);
  },
};
