const { TwitterApi } = require('twitter-api-v2');

const { TWITTER_BEARER_TOKEN } = process.env;

class TwitterService {
  constructor(token = TWITTER_BEARER_TOKEN) {
    this.client = new TwitterApi(token);
  }

  getUserByUsername(username) {
    return twitterClient.v2.userByUsername(username);
  }

  async userLikedTweet(userTwitterId, tweetId) {
    const usersPaginated = await this.client.v2.tweetLikedBy(tweetId, {
      asPaginator: true,
    });

    for await (const user of usersPaginated)
      if (user.id === userTwitterId) return true;

    return false;
  }

  async userRetweetedTweet(userTwitterId, tweetId) {
    const usersPaginated = await this.client.v2.tweetRetweetedBy(tweetId, {
      asPaginator: true,
    });

    for await (const user of usersPaginated)
      if (user.id === userTwitterId) return true;

    return false;
  }
}

module.exports = TwitterService;
