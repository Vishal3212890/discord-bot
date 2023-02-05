const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('view-quests')
    .setLabel('View Quests')
    .setStyle(ButtonStyle.Success),
  async execute(interaction) {
    await interaction.reply({
      content: `Hi ${interaction.user.username}, you have clicked`,
      ephemeral: true,
    });
  },
};
