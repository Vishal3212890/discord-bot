const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  twitterActionRewardRaid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TwitterActionRewardRaid',
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

const UserTwitterActionRewardRaid = mongoose.model(
  'UserTwitterActionRewardRaid',
  schema,
  'users_twitter_action_reward_raids'
);

module.exports = UserTwitterActionRewardRaid;
