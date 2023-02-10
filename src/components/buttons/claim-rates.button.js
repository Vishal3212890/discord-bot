const { ButtonBuilder, ButtonStyle } = require('discord.js');
const claimRatesService = require('../../services/claimRate.service');
const claimRatesEmbed = require('../embeds/claim-rates.embed');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('claim-rates')
    .setLabel('Check Claim Rates')
    .setStyle(ButtonStyle.Primary),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const claimRates = await claimRatesService
      .getAllClaimRates()
      .sort({ rate: 'desc' });
      
    if (claimRates.length === 0) {
      return await interaction.editReply('No claim rates found');
    }

    await interaction.editReply({ embeds: [claimRatesEmbed(claimRates)] });
  },
};
