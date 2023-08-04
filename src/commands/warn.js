const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require('discord.js');
const { knex } = require('../extensions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('경고')
    .setDescription('경고를 관리하는 명령어입니다.')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('처리할 명령을 선택하여 주세요.')
        .setRequired(true)
        .addChoices(
          { name: '부여', value: 'add' },
          { name: '차감', value: 'del' }
        )
    )
    .addUserOption((option) =>
      option
        .setName('member')
        .setDescription('경고를 설정할 유저')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('reason').setDescription('처리 이유')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const query = interaction.options.getString('query');
    const member = interaction.options.getMember('member');
    const reason = interaction.options.getString('reason') ?? '없음';

    const guild = (await knex('guild'))[0];
    const limit = JSON.parse(guild.config).warnlimit;
    const warndata = JSON.parse(guild.warn);

    const memberPosition = member.roles.highest.position;
    const authorPosition = interaction.member.roles.highest.position;

    if (authorPosition < memberPosition) {
      return await interaction.reply({
        content: `당신의 **권한**보다 ${member}님의 **권한**이 더 **높아** 경고를 부여할 수 없습니다.`,
        ephemeral: true,
      });
    }
    if (reason.length > 100) {
      return await interaction.reply({
        content: '사유가 너무 깁니다.',
        ephemeral: true,
      });
    }
    if (!member) {
      return await interaction.reply({
        content: '**유저**를 찾을 수 없습니다.',
        ephemeral: true,
      });
    }
    if (member.user.bot) {
      return await interaction.reply({
        content: '봇에게는 경고를 부여할 수 없습니다.',
        ephemeral: true,
      });
    }
    if (member.permissions.has(PermissionFlagsBits.Administrator)) {
      return await interaction.reply({
        content: `${member}님은 **\`관리자*\`**권한을 가지고 있어 경고를 부여할 수 없습니다.`,
        ephemeral: true,
      });
    }

    let embed = new EmbedBuilder().setTimestamp();
    let infoText = '';

    if (query == 'add') {
      if (!warndata[member.id]) {
        warndata[member.id] = { count: 1, reason: [reason] };
      } else {
        warndata[member.id].count++;
        warndata[member.id].reason.push(reason);
      }

      /** Embed Settings */
      embed.setColor('#ce3232');
      infoText += `* 경고 사유: ${reason}\n* 경고 횟수: ${
        warndata[member.id].count
      }/${limit}\n`;

      if (warndata[member.id].count == limit - 1) {
        await member.timeout(7 * 24 * 60 * 60 * 1000, '경고 2회');
        infoText += '* 처벌: 타임아웃 1주일\n';
      } else if (warndata[member.id].count >= limit) {
        await member.ban({ reason: '경고 3회' });
        infoText += '* 처벌: 영구정지\n';
      }
    } else if (query == 'del') {
      if (!warndata[member.id]) {
        return await interaction.reply({
          content: `${member}님은 경고를 받은적이 없습니다.`,
          ephemeral: true,
        });
      } else if (warndata[member.id].count <= 0) {
        return await interaction.reply({
          content: `${member}님의 경고를 차감할 수 없습니다.`,
          ephemeral: true,
        });
      } else {
        warndata[member.id].count--;
        warndata[member.id].reason.push(reason);
      }

      embed.setColor('#2375e9');
      infoText += `사유: ${reason}\n경고 횟수: ${
        warndata[member.id].count
      }/${limit}`;
    }

    embed = embed
      .setTitle(`#${Math.random().toString(36).substring(2, 7).toUpperCase()}`)
      .addFields({
        name: '👮‍♂️ **처리자**',
        value: `${interaction.user} (${interaction.user.tag})`,
      })
      .addFields({
        name: '🙎‍♂️ **유저**',
        value: `${member} (${member.user.tag})`,
      })
      .addFields({
        name: '> 📃 **정보**',
        value: infoText,
      });

    await interaction.reply({ embeds: [embed] });
    await knex('guild').update({
      warn: JSON.stringify(warndata),
    });
  },
};
