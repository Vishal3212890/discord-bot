const { ModalBuilder, ActionRowBuilder } = require('discord.js');
const { getInputValues } = require('../utils/input.util');
const twitterRaidService = require('../../services/twitterRaid.service');
const twitterRaidMessage = require('../messages/twitter-raid.message');
const twitterRaidEmbed = require('../embeds/twitter-raid.embed');
const {
  tweetUrlInput,
  requiredCommentTextInput,
  rewardInput,
} = require('../inputs/twitter-raid.inputs');

const customIdPrefix = 'edit-twitter-raid-';

module.exports = {
  data: new ModalBuilder()
    .setCustomId(customIdPrefix + '*')
    .setTitle('Edit Twitter Raid'),

  render({ _id: id, tweetUrl, requiredCommentText, reward }) {
    const actionsRows = [
      tweetUrlInput.setValue(tweetUrl),
      requiredCommentTextInput.setValue(requiredCommentText),
      rewardInput.setValue(reward.toString()),
    ].map((c) => new ActionRowBuilder().addComponents(c));

    const customId = customIdPrefix + id.toString();

    return this.data.setCustomId(customId).setComponents(...actionsRows);
  },

  getId(interaction) {
    return interaction.customId.substring(customIdPrefix.length);
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    // Get the data entered
    const [tweetUrl, requiredCommentText, reward] = getInputValues(
      interaction,
      tweetUrlInput,
      requiredCommentTextInput,
      rewardInput
    );

    const twitterRaidId = this.getId(interaction);
    const twitterRaid = await twitterRaidService.updateRaid(
      twitterRaidId,
      {
        tweetUrl,
        requiredCommentText,
        reward,
      }
    );

    const { channelId, discordMessageId } = twitterRaid;

    const channel = interaction.client.channels.cache.get(channelId);
    const messages = await channel.messages.fetch();
    const message = messages.get(discordMessageId);

    await message.edit(twitterRaidMessage(tweetUrl, requiredCommentText, reward));
    await interaction.message.edit({
      embeds: [
        twitterRaidEmbed(tweetUrl, requiredCommentText, reward),
      ],
    });

    await interaction.editReply('Raid Edited');
  },
};
