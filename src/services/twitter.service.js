const { TwitterApi } = require('twitter-api-v2');
const userService = require('./user.service');

const { TWITTER_API_KEY, TWITTER_API_KEY_SECRET } = process.env;

exports.generateAuthUrl = async (discordId) => {
  const client = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_KEY_SECRET,
  });

  const { oauth_token, oauth_token_secret, url } =
    await client.generateAuthLink();

  await userService.updateUserByDiscordId(discordId, {
    twitterOAuthToken: oauth_token,
    twitterOAuthTokenSecret: oauth_token_secret,
  });

  return url;
};

exports.submitPin = async (discordId, pin) => {
  const user = await userService.getUserByDiscordId(discordId);

  const client = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_KEY_SECRET,
    accessToken: user.twitterOAuthToken,
    accessSecret: user.twitterOAuthTokenSecret,
  });

  const {
    client: loggedClient,
    accessToken: twitterAccessToken,
    accessSecret: twitterAccessTokenSecret,
  } = await client.login(pin);

  const twitterUser = await loggedClient.v2.me();

  await userService.updateUserByDiscordId(discordId, {
    twitterId: twitterUser.data.id,
    twitterAccessToken,
    twitterAccessTokenSecret,
  });
};

exports.userLikedTweet = async (twitterId, tweetId) => {
  const client = await this.getUserClient(twitterId);
  const usersPaginated = await client.v2.tweetLikedBy(tweetId, {
    asPaginator: true,
  });

  for await (const user of usersPaginated)
    if (user.id === twitterId) return true;

  return false;
};

exports.userRetweetedTweet = async (twitterId, tweetId) => {
  const client = await this.getUserClient(twitterId);
  const usersPaginated = await client.v2.tweetRetweetedBy(tweetId, {
    asPaginator: true,
  });

  for await (const user of usersPaginated)
    if (user.id === twitterId) return true;

  return false;
};

exports.userCommentedOnTweet = async (twitterId, tweetId, commentText) => {
  const client = await this.getUserClient(twitterId);
  const tweetsPaginated = await client.v2.search(
    `in_reply_to_tweet_id:${tweetId}`,
    {
      'tweet.fields': 'author_id',
    }
  );

  for await (const tweet of tweetsPaginated) {
    if (tweet.author_id === twitterId && tweet.text.includes(commentText))
      return true;
  }

  return false;
};

exports.getUserClient = async (twitterId) => {
  const user = await userService.getUserByTwitterId(twitterId);

  const userClient = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_KEY_SECRET,
    accessToken: user.twitterAccessToken,
    accessSecret: user.twitterAccessTokenSecret,
  });

  return userClient;
};
