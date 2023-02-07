const { TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
  tweetUrlInput: new TextInputBuilder()
    .setCustomId('tweet-url-input')
    .setLabel('Tweet URL')
    .setStyle(TextInputStyle.Paragraph),

  requiredCommentTextInput: new TextInputBuilder()
    .setCustomId('required-comment-text-input')
    .setLabel('Required Comment Text')
    .setStyle(TextInputStyle.Short),

  rewardInput: new TextInputBuilder()
    .setCustomId('reward-input')
    .setLabel('Reward')
    .setStyle(TextInputStyle.Short),
};
