const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('claim-comment-rewards')
    .setLabel('Claim Comment Rewards')
    .setStyle(ButtonStyle.Success),
  async execute(interaction) {
    await interaction.reply({
      content: `Hi ${interaction.user.username}, you have clicked`,
      ephemeral: true,
    });
  },
};
