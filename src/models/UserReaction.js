const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  quest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quest",
    required: true
  },
  discordMessageId: {
    type: String,
    required: true
  }
});

const UserReaction = mongoose.model('UserReaction', schema, 'users_reactions');

module.exports = UserReaction;