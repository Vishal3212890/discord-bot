const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  storeItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StoreItem',
    required: true,
  },
});

const StoreItemApplication = mongoose.model(
  'StoreItemApplication',
  schema,
  'store_item_applications'
);

module.exports = StoreItemApplication;
