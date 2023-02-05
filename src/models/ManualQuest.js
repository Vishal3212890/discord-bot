const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reward: {
    type: Number,
    required: true,
  },
});

const ManualQuest = mongoose.model('ManualQuest', schema, 'manual_quests');

module.exports = ManualQuest;
