const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require('discord.js');

function createEmbed(interaction, type) {
  const returnValue = { content: null, embeds: null, components: null };
  if (type == 'show') {
    const embed = new EmbedBuilder()
      .setColor(0x212a3e)
      .setTitle('자기소개')
      .setDescription(
        `${interaction.client.user}에게 **자신**을 소개하여 주세요.`
      )
      .setImage(
        'https://github.com/INIRU/Azite-Bot-2/blob/main/src/Image/role-select.png?raw=true'
      )
      .addFields({
        name: '> ‼️**주의 사항**',
        value:
          '``` 자기소개를 작성할 경우 아지트 약관에 동의하신걸로 간주합니다.\n허위로 작성하는 경우 제재를 받습니다.``` \n\n성별 역할은 “채널 및 역할” 항목에 들어가면 선택 할 수 있습니다.',
      });
    const button = new ButtonBuilder()
      .setCustomId('show')
      .setLabel('🙋‍♂️ 자기소개')
      .setStyle(ButtonStyle.Primary);

    returnValue.components = [new ActionRowBuilder().addComponents(button)];
    returnValue.embeds = [embed];
  } else {
    return false;
  }
  for (key in Object.keys(returnValue)) {
    if (returnValue[key] == null) {
      delete returnValue[key];
    }
  }
  return returnValue;
}

module.exports = {
  createEmbed,
};
