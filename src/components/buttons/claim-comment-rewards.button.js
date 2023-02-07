const { ButtonBuilder, ButtonStyle } = require('discord.js');
const userService = require('../../services/user.service');
const twitterService = require('../../services/twitter.service');
const twitterRaidService = require('../../services/twitterRaid.service');
const twitterUtil = require('../utils/twitter.util');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('claim-comment-rewards')
    .setLabel('Claim Comment Rewards')
    .setStyle(ButtonStyle.Primary),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const discordId = interaction.user.id;
    const messageId = interaction.message.id;

    const user = await userService.getUserByDiscordId(discordId);
    if (!user.twitterId) {
      return await twitterUtil.handleTwitterAuth(interaction);
    }

    const twitterRaid =
      await twitterRaidService.getRaidByDiscordMessageId(messageId);

    const userCommentedOnTweet = await twitterService.userCommentedOnTweet(
      user.twitterId,
      twitterRaid.tweetId,
      twitterRaid.requiredCommentText
    );

    if (!userCommentedOnTweet) return await interaction.editReply('Tweet not commented with required text');

    const result = await twitterRaidService.claimCommentReward(
      user._id,
      twitterRaid._id,
      twitterRaid.reward
    );
    
    if (result) await interaction.editReply('Comment reward successfully claimed');
    else await interaction.editReply('Comment reward already claimed');
  },
};
