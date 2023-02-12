const User = require('../models/User');

exports.createUser = (userDetails) => new User(userDetails).save();

exports.getUser = (filter) => User.findOne(filter);

exports.getUserById = (id) => User.findById(id);

exports.getUserByDiscordId = (discordId) => User.findOne({ discordId });

exports.getUserByTwitterId = (twitterId) => User.findOne({ twitterId });

exports.updateUserByDiscordId = (discordId, userDetails) =>
  User.updateOne({ discordId }, userDetails);

exports.updateWalletAddress = async (id, address) => {
  const user = await this.getUserById(id);
  if (!user) throw new Error('User not found');

  await User.updateOne({ walletAddress: address }, { walletAddress: null });

  await User.updateOne({ _id: id }, { walletAddress: address });
};

exports.increaseUnclaimedBalance = (id, amount) =>
  User.findByIdAndUpdate(id, { $inc: { unclaimedBalance: amount } });

exports.decreaseUnclaimedBalance = (id, amount) =>
  User.findByIdAndUpdate(id, { $inc: { unclaimedBalance: -amount } });

exports.increaseClaimedBalance = (id, amount) =>
  User.findByIdAndUpdate(id, { $inc: { claimedBalance: amount } });

exports.decreaseClaimedBalance = (id, amount) =>
  User.findByIdAndUpdate(id, { $inc: { claimedBalance: -amount } });

exports.claimUnclaimedBalance = async (id, claimRate) => {
  const user = await this.getUserById(id);
  if (!user) throw new Error('User not found');

  const unclaimedBalance = user.unclaimedBalance;
  user.unclaimedBalance = 0;
  user.claimedBalance += Math.round((unclaimedBalance * claimRate) / 100);

  await user.save();

  return user;
};
