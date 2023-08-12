const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require('discord.js');

function createEmbed(interaction, type) {
  const returnValue = { content: null, embeds: null, components: null };
  if (type == 'tiersel') {
    const tierList = [
      {
        name: '아이언',
        id: 'tier-809832298790518845',
        emoji: '1102544451441799178',
      },
      {
        name: '브론즈',
        id: 'tier-757754722995273849',
        emoji: '1102544309770788914',
      },
      {
        name: '실버',
        id: 'tier-757754794889707581',
        emoji: '1102544556685271161',
      },
      {
        name: '골드',
        id: 'tier-757754786853683241',
        emoji: '1102544377169072158',
      },
      {
        name: '플래티넘',
        id: 'tier-757754908878569643',
        emoji: '1102544491019251722',
      },
      {
        name: '다이아몬드',
        id: 'tier-757754997848145998',
        emoji: '1102545153828339743',
      },
      {
        name: '초월자',
        id: 'tier-989285274456588328',
        emoji: '1102544272659582996',
      },
      {
        name: '불멸',
        id: 'tier-imotal',
        emoji: '1102544415836352532',
      },
      {
        name: '레디언트',
        id: 'tier-radiant',
        emoji: '1102544528893808690',
      },
    ];
    const embed = new EmbedBuilder()
      .setColor(interaction.client.local.commands.embeder.tiersel.embed.color)
      .setTitle(interaction.client.local.commands.embeder.tiersel.embed.title)
      .setDescription(
        interaction.client.local.commands.embeder.tiersel.embed.desc.bind({
          bot: interaction.client.user,
        })
      )
      .setImage(interaction.client.local.commands.embeder.tiersel.embed.image)
      .addFields({
        name: interaction.client.local.commands.embeder.tiersel.embed.fields[0]
          .name,
        value:
          interaction.client.local.commands.embeder.tiersel.embed.fields[0]
            .value,
      });

    let components = new ActionRowBuilder();
    returnValue.components = new Array();

    for (i in tierList) {
      let button = new ButtonBuilder()
        .setCustomId(tierList[i].id)
        .setEmoji(tierList[i].emoji)
        .setLabel(tierList[i].name)
        .setStyle(ButtonStyle.Primary);
      components.addComponents(button);
      if ((i % 4 == 0 && i != 0) || i == tierList.length - 1) {
        returnValue.components.push(components);
        components = new ActionRowBuilder();
      }
    }

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
