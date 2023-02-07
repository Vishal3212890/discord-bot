const { ActionRowBuilder } = require('discord.js');
const claimCommentRewardsButton = require('../buttons/claim-comment-rewards.button');
const claimLikeRewardsButton = require('../buttons/claim-like-rewards.button');
const claimRetweetRewardsButton = require('../buttons/claim-retweet-rewards.button');
const twitterRaidEmbed = require('../embeds/twitter-raid.embed');

module.exports = (tweetUrl, requiredCommentText, reward) => {
  return {
    embeds: [
      twitterRaidEmbed(tweetUrl, requiredCommentText, reward),
    ],
    components: [
      new ActionRowBuilder().setComponents(
        claimLikeRewardsButton.data,
        claimCommentRewardsButton.data,
        claimRetweetRewardsButton.data
      ),
    ],
  };
};
