const TwitterActionRewardRaid = require('../models/TwitterActionRewardRaid');
const UserTwitterActionRewardRaid = require('../models/UserTwitterActionsRewardRaid');
const userService = require('./user.service');

exports.createRaid = (details) => new TwitterActionRewardRaid(details).save();

exports.getRaidById = (id) => TwitterActionRewardRaid.findById(id);

exports.getRaidByDiscordMessageId = (discordMessageId) =>
  TwitterActionRewardRaid.findOne({ discordMessageId });

exports.claimLikeReward = async (userId, raidId, reward) => {
  const filter = { user: userId, twitterActionRewardRaid: raidId };
  
  const userTwitterActionRewardRaid =
    (await UserTwitterActionRewardRaid.findOne(filter)) ??
    new UserTwitterActionRewardRaid(filter);

  if (userTwitterActionRewardRaid.claimedLikeReward) return false;

  userTwitterActionRewardRaid.claimedLikeReward = true;

  await userService.increaseUnclaimedBalance(userId, reward);
  await userTwitterActionRewardRaid.save();

  return true;
};

exports.claimCommentReward = async (userId, raidId, reward) => {
  const filter = { user: userId, twitterActionRewardRaid: raidId };
  
  const userTwitterActionRewardRaid =
    (await UserTwitterActionRewardRaid.findOne(filter))??
    new UserTwitterActionRewardRaid(filter);
  
  if (userTwitterActionRewardRaid.claimedCommentReward) return false;

  userTwitterActionRewardRaid.claimedCommentReward = true;
  
  await userService.increaseUnclaimedBalance(userId, reward);
  await userTwitterActionRewardRaid.save();

  return true;
}

exports.claimRetweetReward = async (userId, raidId, reward) => {
  const filter = { user: userId, twitterActionRewardRaid: raidId };
  const userTwitterActionRewardRaid =
    (await UserTwitterActionRewardRaid.findOne(filter))??
    new UserTwitterActionRewardRaid(filter);

  if (userTwitterActionRewardRaid.claimedRetweetReward) return false;

  userTwitterActionRewardRaid.claimedRetweetReward = true;
  
  await userService.increaseUnclaimedBalance(userId, reward);
  await userTwitterActionRewardRaid.save();

  return true;
}
