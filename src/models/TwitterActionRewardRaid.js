const path = require('node:path');
const url = require('node:url');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  discordMessageId: {
    type: String,
    required: true,
    unique: true,
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

schema.virtual('tweetId').get(function () {
  return path.basename(url.parse(this.tweetUrl).pathname);
});

const TwitterActionRewardRaid = mongoose.model(
  'TwitterActionRewardRaid',
  schema,
  'twitter_action_reward_raid'
);

module.exports = TwitterActionRewardRaid;
