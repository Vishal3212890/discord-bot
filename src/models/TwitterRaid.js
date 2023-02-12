const path = require('node:path');
const url = require('node:url');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  discordMessageId: {
    type: String,
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
    min: 0
  },
  channelId: {
    type: String,
    required: true,
  },
});

schema.virtual('tweetId').get(function () {
  return path.basename(url.parse(this.tweetUrl).pathname);
});

const TwitterRaid = mongoose.model('TwitterRaid', schema, 'twitter_raids');

module.exports = TwitterRaid;
