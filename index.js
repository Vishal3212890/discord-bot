require('./src/startup/env');
const twitterService = require('./src/services/twitter.service');

async function main() {
  const res = await twitterService.userRetweetedTweet('1564689884874706944', '1619130497048936448');
  console.log(res)
}

main();