require('./src/startup/env');
require('./src/startup/db')();
const User = require('./src/models/User');
const twitterService = require('./src/services/twitter.service');

async function main() {
  const user = await User.findOne({ claimedBalance: 1}) ?? new User({claimedBalance: 1});
  
  console.log(user._id);
}

main();