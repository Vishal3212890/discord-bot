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
  role: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: null,
  },
});

const StoreItem = mongoose.model('StoreItem', schema, 'store_items');

module.exports = StoreItem;
