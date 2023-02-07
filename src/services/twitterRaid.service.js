const TwitterRaid = require('../models/TwitterRaid');
const UserTwitterRaid = require('../models/UserTwitterRaid');
const userService = require('./user.service');

exports.createRaid = (details) => new TwitterRaid(details).save();

exports.getRaidById = (id) => TwitterRaid.findById(id);

exports.getRaidByDiscordMessageId = (discordMessageId) =>
  TwitterRaid.findOne({ discordMessageId });

exports.updateRaid = (id, details) =>
  TwitterRaid.findByIdAndUpdate(id, details);

exports.claimLikeReward = async (userId, raidId, reward) => {
  const filter = { user: userId, twitterRaid: raidId };

  const userTwitterRaid =
    (await UserTwitterRaid.findOne(filter)) ?? new UserTwitterRaid(filter);

  if (userTwitterRaid.claimedLikeReward) return false;

  userTwitterRaid.claimedLikeReward = true;

  await userService.increaseUnclaimedBalance(userId, reward);
  await userTwitterRaid.save();

  return true;
};

exports.claimCommentReward = async (userId, raidId, reward) => {
  const filter = { user: userId, twitterRaid: raidId };

  const userTwitterRaid =
    (await UserTwitterRaid.findOne(filter)) ?? new UserTwitterRaid(filter);

  if (userTwitterRaid.claimedCommentReward) return false;

  userTwitterRaid.claimedCommentReward = true;

  await userService.increaseUnclaimedBalance(userId, reward);
  await userTwitterRaid.save();

  return true;
};

exports.claimRetweetReward = async (userId, raidId, reward) => {
  const filter = { user: userId, twitterRaid: raidId };
  const userTwitterRaid =
    (await UserTwitterRaid.findOne(filter)) ?? new UserTwitterRaid(filter);

  if (userTwitterRaid.claimedRetweetReward) return false;

  userTwitterRaid.claimedRetweetReward = true;

  await userService.increaseUnclaimedBalance(userId, reward);
  await userTwitterRaid.save();

  return true;
};
