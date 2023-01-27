const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('balance')
    .setLabel('Check Balance')
    .setStyle(ButtonStyle.Danger),
  async execute(interaction) {
    await interaction.reply(
      `Hi ${interaction.user.username}, you have clicked`
    );
  },
};