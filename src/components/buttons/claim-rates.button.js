const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('claim-rates')
    .setLabel('Check Claim Rates')
    .setStyle(ButtonStyle.Primary),
  async execute(interaction) {
    await interaction.reply({
      content: `Hi ${interaction.user.username}, you have clicked`,
      ephemeral: true,
    });
  },
};
