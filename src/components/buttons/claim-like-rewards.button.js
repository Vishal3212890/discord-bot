const { ButtonBuilder, ButtonStyle } = require('discord.js');
const userService = require('../../services/user.service');
const twitterService = require('../../services/twitter.service');
const twitterRaidService = require('../../services/twitterRaid.service');
const twitterUtil = require('../utils/twitter.util');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('claim-like-rewards')
    .setLabel('Claim Like Rewards')
    .setStyle(ButtonStyle.Success),
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

    const userLikedTweet = await twitterService.userLikedTweet(
      user.twitterId,
      twitterRaid.tweetId
    );

    if (!userLikedTweet) return await interaction.editReply('Tweet Not Liked');

    const result = await twitterRaidService.claimLikeReward(
      user._id,
      twitterRaid._id,
      twitterRaid.reward
    );
    
    if (result) await interaction.editReply('Like reward successfully claimed');
    else await interaction.editReply('Like reward already claimed');
  },
};
