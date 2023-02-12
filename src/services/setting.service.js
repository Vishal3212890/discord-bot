const Setting = require('../models/Setting');

exports.getSetting = async () => {
  const setting = await Setting.findOne();
  if (!setting) throw new Error('Setting not found');
  return setting;
}

exports.getMinimumClaimAmount = async () => {
  const setting = await this.getSetting();
  return setting.minimumClaimAmount;
}

exports.getNftReward = async () => {
  const setting = await this.getSetting();
  return setting.nftReward;
}

exports.updateSetting = async (setting) => Setting.updateOne({}, setting);