const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest',
    required: true,
  }
});

const UserQuest = mongoose.model(
  'UserQuest',
  schema,
  'users_quests'
);

module.exports = UserQuest;