const { default: mongoose } = require("mongoose");

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
  limit: {
    type: Number,
    default: null,
  },
});

const ManualQuest = mongoose.model('ManualQuest', schema, 'manual_quests');

module.exports = ManualQuest;
