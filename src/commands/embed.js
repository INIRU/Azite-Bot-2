const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../extensions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('임베드')
    .setDescription('임베드를 출력하는 명령어 입니다.')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('임베드가 전송될 채널')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('type')
        .setDescription('임베드가 만들어질 타입')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const type = interaction.options.getString('type');

    const reponse = createEmbed(interaction, type);

    if (!reponse) {
      await interaction.reply({
        content: interaction.client.local.commands.embeder.notf,
        ephemeral: true,
      });
      return;
    }
    await interaction.reply({
      content: interaction.client.local.commands.embeder.send.bind({
        chn: channel,
      }),
      ephemeral: true,
    });
    await channel.send(reponse);
  },
};
