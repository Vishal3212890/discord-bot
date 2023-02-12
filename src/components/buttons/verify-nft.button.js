const { ButtonStyle, ButtonBuilder, bold } = require('discord.js');
const userService = require('../../services/user.service');
const nftVerificationService = require('../../services/nftVerification.service');
const xummSignInEmbed = require('../embeds/xumm-sign-in.embed');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('verify-nft')
    .setLabel('Verify')
    .setStyle(ButtonStyle.Success),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const { subscription, authUrl, qrImageUrl } =
      await nftVerificationService.xummSignInInfo();

    await interaction.editReply({
      embeds: [xummSignInEmbed(authUrl, qrImageUrl)],
    });

    const account = await subscription.resolved;

    if (!account) {
      return await interaction.editReply('Sign In Request Rejected');
    }

    await interaction.followUp({
      content: 'Successfully Signed In, Verifying Your NFTs...',
      ephemeral: true,
    });

    const discordId = interaction.user.id;
    const user = await userService.getUserByDiscordId(discordId);
    await userService.updateWalletAddress(user._id, account);

    const reward = await nftVerificationService.claimNftReward(account);

    if (reward === 0) {
      return await interaction.followUp({
        content: 'No NFT Transactions Found',
        ephemeral: true,
      });
    }

    await interaction.followUp({
      content: `Successfully claimed ${bold(reward)}`,
      ephemeral: true,
    });
  },
};

