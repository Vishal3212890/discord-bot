const StoreItem = require('../models/StoreItem');
const StoreItemApplication = require('../models/StoreItemApplication');
const userService = require('../services/user.service');

exports.createItem = (details) => new StoreItem(details).save();

exports.itemExists = (filter) => StoreItem.exists(filter);

exports.getItemById = (id) => StoreItem.findById(id);

exports.getItem = (filter) => StoreItem.findOne(filter);

exports.getAllItems = () => StoreItem.find();

exports.updateItem = (id, details) => StoreItem.findByIdAndUpdate(id, details);

exports.deleteItem = (id) => StoreItem.findByIdAndDelete(id);

exports.increaseStock = async (id) => {
  const storeItem = await this.getItemById(id);
  if (!storeItem) throw new Error('Store item not found');

  if (storeItem.stock === null) return;

  storeItem.stock += 1;
  await storeItem.save();
};

exports.decreaseStock = async (id) => {
  const storeItem = await this.getItemById(id);
  if (!storeItem) throw new Error('Store item not found');

  if (storeItem.stock === null) return;

  storeItem.stock -= 1;
  await storeItem.save();
};

exports.createStoreItemApplication = async (userId, storeItemId) => {
  const storeItemApplicationExists = await this.storeItemApplicationExists(userId, storeItemId);
  if (storeItemApplicationExists) throw new Error('Store Item Application Already Exists');

  const storeItemApplication = await StoreItemApplication.create({ user: userId, storeItem: storeItemId });
  await storeItemApplication.populate('user storeItem');
  return storeItemApplication;
};

exports.getStoreItemApplicationById = (id) => StoreItemApplication.findById(id);

exports.storeItemApplicationExists = async (userId, storeItemId) =>
  StoreItemApplication.exists({
    user: userId,
    storeItem: storeItemId,
  });

exports.acceptStoreItemApplication = async (applicationId) => {
  const storeItemApplication = await this.getStoreItemApplicationById(applicationId);
  if (!storeItemApplication) throw new Error('Store Item Application Not Found');  
  await storeItemApplication.delete();
};

exports.rejectStoreItemApplication = async (applicationId) => {
  const storeItemApplication = await this.getStoreItemApplicationById(applicationId).populate('user storeItem');
  if (!storeItemApplication) throw new Error('Store Item Application Not Found');

  const { user, storeItem } = storeItemApplication;

  await userService.increaseClaimedBalance(user._id, storeItem.price);
  await this.increaseStock(storeItem._id);
  
  await storeItemApplication.delete();
};
