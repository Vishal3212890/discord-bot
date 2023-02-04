const { TwitterApi } = require('twitter-api-v2');
const userService = require('./user.service');

const { TWITTER_API_KEY, TWITTER_API_KEY_SECRET, TWITTER_BEARER_TOKEN } =
  process.env;

const twitterClient = new TwitterApi(TWITTER_BEARER_TOKEN);

exports.getUserByUsername = (username) =>
  twitterClient.v2.userByUsername(username);

exports.getTwitterIdByUsername = async (username) => {
  const user = await this.getUserByUsername(username);
  return user.data.id;
};

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
