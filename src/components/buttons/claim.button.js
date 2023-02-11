const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const claimRateService = require('../../services/claimRate.service');
const confirmClaimEmbed = require('../embeds/confirm-claim.embed');
const confirmClaimButton = require('./confirm-claim.button');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('claim')
    .setLabel('Claim')
    .setStyle(ButtonStyle.Success),

  async execute(interaction) {
    const userRolesIds = Array.from(interaction.member.roles.cache.keys());
    const highestClaimRate = await claimRateService.getHighestClaimRate(userRolesIds);

    await interaction.reply({
      embeds: [confirmClaimEmbed(highestClaimRate)],
      components: [new ActionRowBuilder().addComponents(confirmClaimButton.data)],
      ephemeral: true,
    });
  },
};
