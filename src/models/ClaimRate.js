const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema({
  roleId: {
    type: String,
    required: true,
    unique: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

const ClaimRate = mongoose.model('ClaimRate', schema, 'claim_rates');

module.exports = ClaimRate;
