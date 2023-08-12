const {
  Events,
  ChannelType,
  EmbedBuilder,
  ReactionUserManager,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
const logger = require('../logger');
const { TicketBuild } = require('../extensions');
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (interaction.user.bot) return;
    if (
      interaction.channel.type == ChannelType.DM &&
      interaction.isChatInputCommand()
    ) {
      logger.info(`${interaction.user} is DM Interaction`);
      await interaction.reply('**DM**은 지원하지 않습니다.');
    }

    /* Select Menu **/
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId == 'ticket') {
        await TicketBuild(interaction, interaction.values[0]);
      }
    }

    /** Button Inputs */
    if (interaction.isButton()) {
      const tierRegex = /tier-\w+/;
      if (tierRegex.test(interaction.customId)) {
        if (
          interaction.customId.replace('tier-', '') == 'radiant' ||
          'imotal'
        ) {
          return await TicketBuild(interaction, 'roles');
        }

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

      /* Ticket Close **/
      if (interaction.customId == 'tkclose') {
        const ticketUser = await interaction.client.users.fetch(
          interaction.channel.topic
        );
        const logChannel =
          interaction.client.channels.cache.get('848872116102889492');
        const ticketId = interaction.channel.name.substr(6);
        const attachment = await discordTranscripts.createTranscript(
          interaction.channel,
          { poweredBy: false }
        );

        const embed = new EmbedBuilder()
          .setAuthor({
            name: ticketUser.tag,
            iconURL: ticketUser.avatarURL(),
          })
          .setDescription(
            '티켓이 비활성화 되었습니다.\n`[!] 파일을 다운로드하여 대화 내역을 확인할 수 있습니다.`'
          )
          .setColor(0xe06469)
          .addFields(
            {
              name: '> 🪪 **ID**',
              value: ticketId,
              inline: true,
            },
            {
              name: '🕖 **HISTORY**',
              value: `<t:${Math.floor(new Date().getTime() / 1000)}:t>`,
              inline: true,
            }
          );

        await logChannel.send({ files: [attachment], embeds: [embed] });
        await interaction.channel.delete();

        try {
          const button = new ButtonBuilder()
            .setLabel('평가하기')
            .setCustomId(`${ticketId}-btn`)
            .setStyle(ButtonStyle.Primary);

          await ticketUser.send({
            content: `${ticketUser}님 **문제사항** 또는 **궁금증**이 해결됐으면 좋겠습니다.\n다음에 또 비슷한 일로 문의를 하실때는 **\`티켓 ID(${ticketId})\`**를 관리자에게 알려주세요.`,
            components: [new ActionRowBuilder().addComponents(button)],
          });
        } catch (e) {
          logger.error(e);
        }
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
