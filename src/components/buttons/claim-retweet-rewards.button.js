const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('claim-retweet-rewards')
    .setLabel('Claim Retweet Rewards')
    .setStyle(ButtonStyle.Danger),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.editReply({
      content: `Hi ${interaction.user.username}, you have clicked`,
    });
  },
};
