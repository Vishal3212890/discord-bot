const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

const commentAttackSettingsModal = new ModalBuilder()
  .setCustomId('comment-attack-settings-modal')
  .setTitle('Comment Attack Configuration');

// Create the text input components
const tweetUrlInput = new TextInputBuilder()
  .setCustomId('tweet-url-input')
  .setLabel('Tweet URL')
  .setStyle(TextInputStyle.Paragraph);

const requiredCommentTextInput = new TextInputBuilder()
  .setCustomId('required-comment-text-input')
  .setLabel('Required Comment Text')
  .setStyle(TextInputStyle.Short);

const commentRewardInput = new TextInputBuilder()
  .setCustomId('comment-reward-input')
  .setLabel('Comment Reward')
  .setStyle(TextInputStyle.Short);

// An action row only holds one text input,
// so you need one action row per text input.
const actionsRows = [
  tweetUrlInput,
  requiredCommentTextInput,
  commentRewardInput,
].map((c) => new ActionRowBuilder().addComponents(c));

// Add inputs to the modal
commentAttackSettingsModal.addComponents(...actionsRows);

module.exports = commentAttackSettingsModal;
