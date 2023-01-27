const User = require('../models/User');

exports.createUser = (userDetails) => new User(userDetails).save();

exports.getUserByDiscordId = (discordId) => User.findOne({ discordId });

exports.updateUserByDiscordId = (discordId, userDetails) =>
  User.updateOne({ discordId }, userDetails);
