const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

const commentAttackSettingsModal = new ModalBuilder()
  .setCustomId('comment-attack-settings-modal')
  .setTitle('Comment Attack Configuration');

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

const actionsRows = [
  tweetUrlInput,
  requiredCommentTextInput,
  commentRewardInput,
].map((c) => new ActionRowBuilder().addComponents(c));

commentAttackSettingsModal.addComponents(...actionsRows);

module.exports = {
  data: commentAttackSettingsModal,
  async execute(interaction) {
    await interaction.reply(
      `Hi ${interaction.user.username}, you have submitted the modal`
    );
  },
};