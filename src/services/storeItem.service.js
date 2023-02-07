const StoreItem = require('../models/StoreItem');

exports.createItem = (details) => new StoreItem(details).save();

exports.itemExists = (filter) => StoreItem.exists(filter); 

exports.getItemById = (id) => StoreItem.findById(id);

exports.getAllItems = () => StoreItem.find();

exports.updateItem = (id, details) =>
  StoreItem.findByIdAndUpdate(id, details);

exports.deleteItem = (id) => StoreItem.findByIdAndDelete(id);
