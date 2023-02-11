const { ButtonBuilder, ButtonStyle, bold } = require('discord.js');
const claimRateService = require('../../services/claimRate.service');
const userService = require('../../services/user.service');

const { MINIMUM_CLAIM_AMOUNT } = process.env;

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('confirm-claim')
    .setLabel('Confirm')
    .setStyle(ButtonStyle.Success),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const discordId = await interaction.user.id;

    const user = await userService.getUserByDiscordId(discordId);

    if (user.unclaimedBalance < MINIMUM_CLAIM_AMOUNT) {
      return await interaction.editReply(`Minimum claim amount is ${bold(MINIMUM_CLAIM_AMOUNT)}`);
    }

    const userRolesIds = Array.from(interaction.member.roles.cache.keys());
    const highestClaimRate = await claimRateService.getHighestClaimRate(userRolesIds);

    await userService.claimUnclaimedBalance(user._id, highestClaimRate);

    await interaction.editReply(`Successfully claimed your unclaimed balance`);
  },
};
