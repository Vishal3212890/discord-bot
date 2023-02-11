const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  roleId: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: null,
    min: 0,
  },
});

const StoreItem = mongoose.model('StoreItem', schema, 'store_items');

module.exports = StoreItem;
