const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  reward: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: [
      'reach_n_messages',
      'invite_n_people',
      'add_reactions_in_announcement',
      'boost_the_server',
      'manual_quest',
    ],
    required: true,
  },
  numberOfMessages: Number,
  numberOfInvites: Number,
});

const Quest = mongoose.model('Quest', schema);

module.exports = Quest;
