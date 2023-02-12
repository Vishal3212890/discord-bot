const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema({
  minimumClaimAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  nftReward: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Setting = mongoose.model('Setting', schema, 'setting');

module.exports = Setting;
