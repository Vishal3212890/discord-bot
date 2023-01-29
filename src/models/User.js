const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  discordId: {
    type: String,
    required: true,
  },
  twitterId: {
    type: String,
    default: null
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
});

const User = mongoose.model('user', userSchema);

module.exports = User;
