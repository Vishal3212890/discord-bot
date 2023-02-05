const { TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
  nameInput: new TextInputBuilder()
    .setCustomId('name-input')
    .setLabel('Name')
    .setStyle(TextInputStyle.Short),

  descriptionInput: new TextInputBuilder()
    .setCustomId('description-input')
    .setLabel('Description')
    .setStyle(TextInputStyle.Paragraph),

  rewardInput: new TextInputBuilder()
    .setCustomId('reward-input')
    .setLabel('Reward')
    .setStyle(TextInputStyle.Short),

  numberOfMessagesInput: new TextInputBuilder()
    .setCustomId('number-of-messages-input')
    .setLabel('Number of Messages')
    .setStyle(TextInputStyle.Short),

  numberOfInvitesInput: new TextInputBuilder()
    .setCustomId('number-of-invites-input')
    .setLabel('Number of Invites')
    .setStyle(TextInputStyle.Short),
};
