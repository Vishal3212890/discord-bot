const StoreItem = require('../models/StoreItem');

exports.createStoreItem = (storeDetails) => new StoreItem(storeDetails).save();

exports.getStoreItemById = (id) => StoreItem.findById(id);

exports.getAllStoreItems = () => StoreItem.find();

exports.updateStoreItem = (id, storeDetails) =>
  StoreItem.findByIdAndUpdate(id, storeDetails);

exports.deleteStoreItem = (id) => StoreItem.findByIdAndDelete(id);
