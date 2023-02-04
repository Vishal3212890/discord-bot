const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('delete-quest')
    .setLabel('Delete Quest')
    .setStyle(ButtonStyle.Danger),
  async execute(interaction) {
    // const discordId = interaction.user.id;
    // const user = await userService.getUserByDiscordId(discordId);
    // const { claimedBalance, unclaimedBalance } = user;
    // await interaction.reply({
    //   embeds: [balanceEmbed(claimedBalance, unclaimedBalance)],
    //   ephemeral: true,
    // });
  },
};
