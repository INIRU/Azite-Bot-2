const { Events, ChannelType, EmbedBuilder } = require('discord.js');
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
    if (interaction.isButton()) {
      const tierRegex = /tier-\d+/;
      if (tierRegex.test(interaction.customId)) {
        let selTier = interaction.guild.roles.cache.find(
          (r) => r.id === interaction.customId.replace('tier-', '')
        );
        let memberTier = '';
        let tierRoles = [
          '809832298790518845',
          '757754722995273849',
          '757754794889707581',
          '757754786853683241',
          '757754908878569643',
          '757754997848145998',
          '989285274456588328',
          '896387175610998835',
          '896386994635157564',
        ];
        for (i in tierRoles) {
          if (
            interaction.member.roles.cache.find((r) => r.id === tierRoles[i])
          ) {
            memberTier = interaction.guild.roles.cache.find(
              (r) => r.id === tierRoles[i]
            );
            break;
          }
        }

        if (selTier == memberTier) {
          return await interaction.reply({
            content: interaction.client.local.button.tiersel.equal,
            ephemeral: true,
          });
        }

        let tierLevel =
          tierRoles.indexOf(selTier.id) > tierRoles.indexOf(memberTier.id);
        const embed = new EmbedBuilder()
          .setTitle(
            tierLevel
              ? interaction.client.local.button.tiersel.up
              : interaction.client.local.button.tiersel.down
          )
          .setColor(tierLevel ? 0x16b077 : 0xf14121)
          .setDescription(` **\`+\`** ${selTier}\n**\`-\`** ${memberTier}`);
        await interaction.reply({ embeds: [embed], ephemeral: true });
        await interaction.member.roles.add([selTier]);
        await interaction.member.roles.remove([memberTier]);
        logger.info(
          `${interaction.member.id} : ${memberTier.name} -> ${selTier.name} Changed!`
        );
      }
    }

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
