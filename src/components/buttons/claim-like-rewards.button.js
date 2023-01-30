const { ButtonBuilder, ButtonStyle } = require('discord.js');
const twitterUsernameSetupModal = require('../modals/twitter-username-setup.modal');
const userService = require('../../services/user.service');
const twitterService = require('../../services/twitter.service');
const twitterActionRewardRaidService = require('../../services/twitterActionRewardRaid.service');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('claim-like-rewards')
    .setLabel('Claim Like Rewards')
    .setStyle(ButtonStyle.Primary),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const discordId = interaction.user.id;
    const messageId = interaction.message.id;

    const user = await userService.getUserByDiscordId(discordId);
    if (!user || !user.twitterId) {
      return await interaction.showModal(twitterUsernameSetupModal.data);
    }

    const twitterActionRewardRaid =
      await twitterActionRewardRaidService.getRaidByDiscordMessageId(messageId);

    const userLikedTweet = await twitterService.userLikedTweet(
      user.twitterId,
      twitterActionRewardRaid.tweetId
    );

    if (userLikedTweet) {
      await user.increaseUnclaimedBalance(twitterActionRewardRaid.reward);
    }
 
    await interaction.editReply('Like points successfully claimed');
  },
};
