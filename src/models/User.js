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
  walletAddress: {
    type: String,
    default: null,
  },
  twitterOAuthToken: String,
  twitterOAuthTokenSecret: String,
  twitterAccessToken: String,
  twitterAccessTokenSecret: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
