const { ButtonBuilder, ButtonStyle } = require('discord.js');
const userService = require('../../services/user.service');
const twitterService = require('../../services/twitter.service');
const twitterActionRewardRaidService = require('../../services/twitterActionRewardRaid.service');
const twitterUtil = require('../utils/twitter.util');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('claim-comment-rewards')
    .setLabel('Claim Comment Rewards')
    .setStyle(ButtonStyle.Success),
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

    const userCommentedOnTweet = await twitterService.userCommentedOnTweet(
      user.twitterId,
      twitterActionRewardRaid.tweetId,
      twitterActionRewardRaid.requiredCommentText
    );

    if (!userCommentedOnTweet) return await interaction.editReply('Tweet not commented with required text');

    const result = await twitterActionRewardRaidService.claimCommentReward(
      user._id,
      twitterActionRewardRaid._id,
      twitterActionRewardRaid.reward
    );
    
    if (result) await interaction.editReply('Comment reward successfully claimed');
    else await interaction.editReply('Comment reward already claimed');
  },
};
