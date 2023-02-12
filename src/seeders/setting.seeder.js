const Setting = require('../models/Setting');

const settingSeed = [
  {
    minimumClaimAmount: 1000,
    nftReward: 200,
  },
];

module.exports = async () => {
  const docCount = await Setting.countDocuments();
  if (docCount === 0) {
    console.log('Seeding Setting...')
    await Setting.insertMany(settingSeed);
  }
};
