const {
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  channelLink,
} = require('discord.js');

async function TicketBuild(interaction, type) {
  const guild = interaction.guild;
  const logChannel = guild.channels.cache.get('848872116102889492');
  const member = interaction.member;
  const ticketId = Math.random().toString(36).substring(2, 8);
  let chanTag = '';
  let authorMsg = '';
  if (type == 'roles') {
    chanTag = '🔱・불레';
    authorMsg =
      '> {chn} 채널로 가셔서 자신의 티어를 증명하세요.\n자신의 **티어**와 **닉네임** 보이게 **경쟁전 시작화면** or **순위표** 스크린샷 해주세요.\n`[!] 모두 현재 시즌으로 올려주세요`';
  } else if (type == 'report') {
    chanTag = '🚨・신고';
  } else if (type == 'game') {
    chanTag = '🎮・프로';
  } else if (type == 'youtube') {
    chanTag = '🎬・유튜버';
  } else if (type == 'etc') {
    chanTag = '🗂️・기타';
  }

  const channel = await guild.channels.create({
    name: chanTag + `-${ticketId}`,
    type: ChannelType.GuildText,
    parent: '848842003319357480',
    topic: member.id,
    permissionOverwrites: [
      {
        id: member,
        allow: [
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.EmbedLinks,
          PermissionFlagsBits.UseEmbeddedActivities,
        ],
      },
      {
        id: guild.roles.everyone,
        deny: [PermissionFlagsBits.ViewChannel],
      },
    ],
  });

  const embed = new EmbedBuilder()
    .setTitle(chanTag + `-${ticketId}`)
    .setDescription(
      '**잠시만 기다려주세요. 관리팀이 최대한 빨리 확인하고 답장할 거에요!**\n\n> `지원을 종료하시려면 아래의 버튼을 눌러주세요. (관리자 또는 티켓 생성자)`'
    );

  const ticketClose = new ButtonBuilder()
    .setCustomId('tkclose')
    .setLabel('🔒 지원 종료')
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder().addComponents(ticketClose);

  await channel.send({
    content: `${member}`,
    embeds: [embed],
    components: [row],
  });

  const logEmbed = new EmbedBuilder()
    .setAuthor({
      name: member.nickname,
      iconURL: member.user.displayAvatarURL(),
    })
    .setDescription('티켓이 생성되었습니다.')
    .setColor(0xa4d0a4)
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

  await logChannel.send({
    content: `${member} ${ticketId}`,
    embeds: [logEmbed],
  });
  await interaction.reply({
    content: `${channel} 채널로 이동해주세요.\n\n${authorMsg.bind({
      chn: channel,
    })}`,
    ephemeral: true,
  });
}

module.exports = {
  TicketBuild,
};
