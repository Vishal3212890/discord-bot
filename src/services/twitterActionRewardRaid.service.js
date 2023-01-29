const TwitterActionRewardRaid = require("../models/TwitterActionRewardRaid");

exports.createTwitterActionRewardRaid = (details) => new TwitterActionRewardRaid(details).save();