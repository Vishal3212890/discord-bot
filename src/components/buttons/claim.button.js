const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('claim')
    .setLabel('Claim')
    .setStyle(ButtonStyle.Success),
  async execute(interaction) {
    await interaction.reply({ content: 'hii', ephemeral: true });
  },
};
