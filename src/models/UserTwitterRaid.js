const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  twitterRaid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TwitterRaid',
    required: true,
  },
  claimedLikeReward: {
    type: Boolean,
    default: false,
  },
  claimedCommentReward: {
    type: Boolean,
    default: false,
  },
  claimedRetweetReward: {
    type: Boolean,
    default: false,
  },
});

const UserTwitterRaid = mongoose.model('UserTwitterRaid', schema, 'users_twitter_raids');

module.exports = UserTwitterRaid;
