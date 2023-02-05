const Store = require("../models/Store");

exports.createStore = (storeDetails) => new Store(storeDetails).save();

exports.getStoreById = (id) => Store.findById(id);

exports.updateStoreById = (id, storeDetails) =>
  Store.findByIdAndUpdate(id, storeDetails);

exports.deleteStoreById = (id) => 
    Store.findByIdAndDelete(id);

exports.getAllStores = () => Store.find({});
