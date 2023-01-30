const TwitterActionRewardRaid = require('../models/TwitterActionRewardRaid');
const UserTwitterActionRewardRaid = require('../models/UserTwitterActionsRewardRaid');

exports.createRaid = (details) => new TwitterActionRewardRaid(details).save();

exports.getRaidByDiscordMessageId = (discordMessageId) =>
  TwitterActionRewardRaid.findOne({ discordMessageId });

exports.claimLikeReward = async (userId, raidId) => {
  const filter = { user: userId, twitterActionRewardRaid: raidId };
  
  const userTwitterActionRewardRaid =
    (await UserTwitterActionRewardRaid.findOne(filter)) ??
    new UserTwitterActionRewardRaid(filter);

  if (userTwitterActionRewardRaid.claimedLikeReward) return false;

  
};
