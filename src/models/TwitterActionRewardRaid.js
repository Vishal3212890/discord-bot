const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema({
  discordMessageId: {
    type: String,
    required: true,
    unique: true
  },
  tweetUrl: {
    type: String,
    required: true,
  },
  requiredCommentText: {
    type: String,
    required: true,
  },
  reward: {
    type: Number,
    required: true,
  },
});

const TwitterActionRewardRaid = mongoose.model('TwitterActionRewardRaid', schema, 'twitter_action_reward_raid');

module.exports = TwitterActionRewardRaid;
