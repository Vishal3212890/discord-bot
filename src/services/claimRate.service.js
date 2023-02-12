const ClaimRate = require('../models/ClaimRate');

exports.createClaimRate = (details) => new ClaimRate(details).save();

exports.claimRateExists = (filter) => ClaimRate.exists(filter);

exports.getClaimRateById = (id) => ClaimRate.findById(id);

exports.getClaimRate = (filter) => ClaimRate.findOne(filter);

exports.getAllClaimRates = () => ClaimRate.find();

exports.updateClaimRate = (id, details) =>
  ClaimRate.findByIdAndUpdate(id, details);

exports.deleteClaimRate = (id) => ClaimRate.findByIdAndDelete(id);

exports.getHighestClaimRate = async (roleIds) => {
  const claimRates = await this.getAllClaimRates().sort({ rate: 'desc' });
  
  for (const claimRate of claimRates) {    
    if (roleIds.includes(claimRate.roleId)) {
      return claimRate.rate;
    }
  }

  return 100;
};
