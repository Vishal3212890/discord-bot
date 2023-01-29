const { ButtonBuilder, ButtonStyle } = require('discord.js');
const userService = require('../../services/user.service');
const balanceEmbed = require('../embeds/balance.embed');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('balance')
    .setLabel('Check Balance')
    .setStyle(ButtonStyle.Danger),
  async execute(interaction) {
    const discordId = interaction.user.id;
    const user = await userService.getUserByDiscordIdOrCreate(discordId);
    const { claimedBalance, unclaimedBalance } = user;
    await interaction.reply({
      embeds: [balanceEmbed(claimedBalance, unclaimedBalance)],
      ephemeral: true,
    });
  },
};
