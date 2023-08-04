const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('임베더')
    .addChannelOption((option) => option.setName('channel').setRequired(true))
    .addStringOption((option) => option.setName('name').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const name = interaction.options.getString('name');

    const reponse = createEmbed(interaction, type);

    if (!reponse) {
      return await interaction.reply({
        content: '등록이 안된 `embed`입니다.',
        ephemeral: true,
      });
    }
  },
};
