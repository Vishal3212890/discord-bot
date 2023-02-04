const { ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('edit-quest')
    .setLabel('Edit Quest')
    .setStyle(ButtonStyle.Primary),
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
