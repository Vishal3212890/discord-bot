const { ModalBuilder, ActionRowBuilder } = require('discord.js');
const { getInputValues } = require('../utils/input.util');
const twitterRaidService = require('../../services/twitterRaid.service');
const twitterRaidMessage = require('../messages/twitter-raid.message');
const { tweetUrlInput, requiredCommentTextInput, rewardInput } = require('../inputs/twitter-raid.inputs');
const manageTwitterRaidMessage = require('../messages/manage-twitter-raid.message');

const actionsRows = [
  tweetUrlInput,
  requiredCommentTextInput,
  rewardInput,
].map((c) => new ActionRowBuilder().addComponents(c));

const customIdPrefix = 'create-twitter-raid-';

module.exports = {
  data: new ModalBuilder()
    .setCustomId(customIdPrefix + '*')
    .setTitle('Create Twitter Raid'),

  render(channelId) {
    const customId = customIdPrefix + channelId.toString();
    return this.data.setCustomId(customId).addComponents(...actionsRows);
  },

  getId(interaction) {
    return interaction.customId.substring(customIdPrefix.length);
  },

  async execute(interaction) {
    await interaction.deferReply();

    // Get the data entered
    const [tweetUrl, requiredCommentText, reward] = getInputValues(
      interaction,
      tweetUrlInput,
      requiredCommentTextInput,
      rewardInput
    );

    // Get Channel
    const channelId = this.getId(interaction);
    const channel = interaction.client.channels.cache.get(channelId);

    const sentMessage = await channel.send(
      twitterRaidMessage(tweetUrl, requiredCommentText, reward)
    );

    const twitterRaid = await twitterRaidService.createRaid({
      discordMessageId: sentMessage.id,
      tweetUrl,
      requiredCommentText,
      reward,
      channelId,
    });

    await interaction.editReply(
      manageTwitterRaidMessage(
        twitterRaid._id.toString(),
        tweetUrl,
        requiredCommentText,
        reward
      )
    );
  },
};