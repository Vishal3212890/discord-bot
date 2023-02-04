const { ButtonBuilder, ButtonStyle } = require('discord.js');
const userService = require('../../services/user.service');
const twitterService = require('../../services/twitter.service');
const twitterActionRewardRaidService = require('../../services/twitterActionRewardRaid.service');
const twitterUtil = require('../utils/twitter.util');

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
    if (!user.twitterId) {
      return await twitterUtil.handleTwitterAuth(interaction);
    }

    const twitterActionRewardRaid =
      await twitterActionRewardRaidService.getRaidByDiscordMessageId(messageId);

    const userLikedTweet = await twitterService.userLikedTweet(
      user.twitterId,
      twitterActionRewardRaid.tweetId
    );

    if (!userLikedTweet) return await interaction.editReply('Tweet Not Liked');

    const result = await twitterActionRewardRaidService.claimLikeReward(
      user._id,
      twitterActionRewardRaid._id,
      twitterActionRewardRaid.reward
    );
    
    if (result) await interaction.editReply('Like reward successfully claimed');
    else await interaction.editReply('Like reward already claimed');
  },
};
