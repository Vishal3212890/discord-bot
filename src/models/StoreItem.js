const { default: mongoose } = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  roleId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
  },
});

const StoreItem = mongoose.model('StoreItem', schema, 'store_items');

module.exports = StoreItem;
