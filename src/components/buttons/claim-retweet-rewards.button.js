const { ButtonBuilder, ButtonStyle } = require('discord.js');
const userService = require('../../services/user.service');
const twitterService = require('../../services/twitter.service');
const twitterActionRewardRaidService = require('../../services/twitterActionRewardRaid.service');
const twitterUtil = require('../utils/twitter.util');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('claim-retweet-rewards')
    .setLabel('Claim Retweet Rewards')
    .setStyle(ButtonStyle.Danger),
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

    const userRetweetedTweet = await twitterService.userRetweetedTweet(
      user.twitterId,
      twitterActionRewardRaid.tweetId
    );

    if (!userRetweetedTweet) return await interaction.editReply('Tweet Not Retweeted');

    const result = await twitterActionRewardRaidService.claimRetweetReward(
      user._id,
      twitterActionRewardRaid._id,
      twitterActionRewardRaid.reward
    );
    
    if (result) await interaction.editReply('Retweet reward successfully claimed');
    else await interaction.editReply('Retweet reward already claimed');
  },
};
