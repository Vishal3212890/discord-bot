const User = require('../models/User');

exports.createUser = (userDetails) => new User(userDetails).save();

exports.getUserById = (id) => User.findById(id);

exports.getUserByDiscordId = (discordId) => User.findOne({ discordId });

exports.getUserByTwitterId = (twitterId) => User.findOne({ twitterId });

exports.updateUserByDiscordId = (discordId, userDetails) =>
  User.updateOne({ discordId }, userDetails);

exports.increaseUnclaimedBalance = (id, amount) =>
  User.findByIdAndUpdate(id, { $inc: { unclaimedBalance: amount } });

// async function main() {
//   const user = await User.findOne({
//     discordId: "1067033468699160636"});
//   await user.increaseUnclaimedBalance(3);
// }

// main();
