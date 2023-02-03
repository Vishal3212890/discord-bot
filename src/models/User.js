const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true,
  },
  twitterId: {
    type: String,
    default: null,
  },
  claimedBalance: {
    type: Number,
    required: true,
    default: 0,
  },
  unclaimedBalance: {
    type: Number,
    required: true,
    default: 0,
  },
  twitterOAuthToken: String,
  twitterOAuthTokenSecret: String,
  twitterAccessToken: String,
  twitterAccessTokenSecret: String,
});

userSchema.methods.increaseUnclaimedBalance = function (amount) {
  this.set({ unclaimedBalance: this.unclaimedBalance + amount });
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
