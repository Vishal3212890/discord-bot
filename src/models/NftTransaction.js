const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const NftTransaction = mongoose.model(
  'NftTransaction',
  schema,
  'nft_transactions'
);

module.exports = NftTransaction;
