const { EmbedBuilder } = require('discord.js');

function createEmbed(interaction, type) {
  const reponseValue = { content: null, embeds: null, components: null };
  if (type == 'show') {
    const embed = new EmbedBuilder()
      .setColor(0x212a3e)
      .setTitle('자기소개')
      .setDescription(
        `${interaction.client.user}에게 **자신**을 소개하여 주세요.`
      )
      .setThumbnail('')
      .addFields({
        name: '> ‼️**주의 사항**',
        value:
          '``` 자기소개를 작성할 경우 아지트 약관에 동의하신걸로 간주합니다.\n허위로 작성하는 경우 제재를 받습니다.```',
      });
  }
}
