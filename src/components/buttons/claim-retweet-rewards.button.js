const { ButtonBuilder, ButtonStyle } = require('discord.js');
const twitterUsernameSetupModal = require('../modals/twitter-username-setup.modal');
const userService = require('../../services/user.service');
const twitterService = require('../../services/twitter.service');
const twitterActionRewardRaidService = require('../../services/twitterActionRewardRaid.service');

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
    if (!user || !user.twitterId) {
      return await interaction.showModal(twitterUsernameSetupModal.data);
    }

    const twitterActionRewardRaid =
      await twitterActionRewardRaidService.getRaidByDiscordMessageId(messageId);

    const userLikedTweet = await twitterService.userRetweetedTweet(
      user.twitterId,
      twitterActionRewardRaid.tweetId
    );

    if (!userLikedTweet) return await interaction.editReply('Tweet Not Retweeted');

    const result = await twitterActionRewardRaidService.claimRetweetReward(
      user._id,
      twitterActionRewardRaid._id,
      twitterActionRewardRaid.reward
    );
    
    if (result) await interaction.editReply('Retweet reward successfully claimed');
    else await interaction.editReply('Retweet reward already claimed');
  },
};