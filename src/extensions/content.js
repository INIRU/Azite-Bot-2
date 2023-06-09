const { EmbedBuilder } = require('discord.js');

function contentBuilder(interaction, name, query) {
  let returnValue = { content: null, embeds: null, components: null };
  if (name === 'slashErrorUser') {
    const embed = new EmbedBuilder()
      .setTitle('⛔️ 알 수 없는 오류가 발생했습니다.')
      .setDescription(
        `다음 정보를 개발자에게 전달해주시면 문제해결에 큰 도움이 됩니다.\n\`\`\`js\nID: ${query.id}\nNAME: ${query.error.name}\nMESSAGE: ${query.error.message}\`\`\``
      )
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.avatarURL(),
      });
    returnValue.embeds = [embed];
  } else if (name === 'slashErrorDev') {
    const embed = new EmbedBuilder()
      .setTitle('🔍 알 수 없는 오류를 발견하였습니다.')
      .addFields({
        name: '**Infomation**',
        value: `\`\`\`js\nID ${query.id}\nUSER: ${interaction.user.id}\nCHANNEL: ${interaction.channel.id}\nGUILD: ${interaction.guild.id}\nPERMISSIONS: ${interaction.guild.members.me.permissions.bitfield}\`\`\``,
        inline: false,
      })
      .addFields({
        name: '**ERROR**',
        value: `\`\`\`js\n${query.error}\`\`\``,
      })
      .setTimestamp()
      .setFooter({
        text: interaction.user.tag,
        iconURL: interaction.user.avatarURL(),
      });
    returnValue.content = query.id;
    returnValue.embeds = [embed];
  }

  for (let key in Object.keys(returnValue)) {
    if (returnValue[key] == null) {
      delete returnValue[key];
    }
  }
  return returnValue;
}
module.exports = {
  contentBuilder,
};
