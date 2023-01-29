const User = require('../models/User');

exports.createUser = (userDetails) => new User(userDetails).save();

exports.getUserByDiscordId = (discordId) => User.findOne({ discordId });

exports.getUserByDiscordIdOrCreate = async (discordId) => {
  const user = await this.getUserByDiscordId(discordId);
  return user ?? new User({ discordId }).save();
};

exports.updateUserByDiscordId = (discordId, userDetails) =>
  User.updateOne({ discordId }, userDetails);
