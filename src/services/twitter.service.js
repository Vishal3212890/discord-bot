const { TwitterApi } = require('twitter-api-v2');

const { TWITTER_BEARER_TOKEN } = process.env;

const twitterClient = new TwitterApi(TWITTER_BEARER_TOKEN);

exports.getUserByUsername = (username) =>
  twitterClient.v2.userByUsername(username);

exports.getTwitterIdByUsername = async (username) => {
  const user = await this.getUserByUsername(username);
  return user.data.id;
}

exports.userLikedTweet = async (userTwitterId, tweetId) => {
  const usersPaginated = await twitterClient.v2.tweetLikedBy(tweetId, {
    asPaginator: true,
  });

  for await (const user of usersPaginated)
    if (user.id === userTwitterId) return true;

  return false;
};

exports.userRetweetedTweet = async (userTwitterId, tweetId) => {
  const usersPaginated = await twitterClient.v2.tweetRetweetedBy(tweetId, {
    asPaginator: true,
  });

  for await (const user of usersPaginated)
    if (user.id === userTwitterId) return true;

  return false;
};
