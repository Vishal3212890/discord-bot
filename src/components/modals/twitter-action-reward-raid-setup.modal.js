const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');
const stringUtils = require('../../utils/string.utils');
const claimCommentRewardsButton = require('../buttons/claim-comment-rewards.button');
const claimLikeRewardsButton = require('../buttons/claim-like-rewards.button');
const claimRetweetRewardsButton = require('../buttons/claim-retweet-rewards.button');
const twitterActionRewardRaidEmbed = require('../embeds/twitter-action-reward-raid.embed');
const twitterActionRewardRaidService = require('../../services/twitterActionRewardRaid.service');

const twitterActionRewardRaidSetupModal = new ModalBuilder()
  .setCustomId('twitter-actions-rewards-raid-setup-modal')
  .setTitle('Twitter Actions Rewards Setup');

const tweetUrlInput = new TextInputBuilder()
  .setCustomId('tweet-url-input')
  .setLabel('Tweet URL')
  .setStyle(TextInputStyle.Paragraph);

const requiredCommentTextInput = new TextInputBuilder()
  .setCustomId('required-comment-text-input')
  .setLabel('Required Comment Text')
  .setStyle(TextInputStyle.Short);

const rewardInput = new TextInputBuilder()
  .setCustomId('reward-input')
  .setLabel('Reward')
  .setStyle(TextInputStyle.Short);

const actionsRows = [
  tweetUrlInput,
  requiredCommentTextInput,
  rewardInput,
].map((c) => new ActionRowBuilder().addComponents(c));

twitterActionRewardRaidSetupModal.addComponents(...actionsRows);

module.exports = {
  data: twitterActionRewardRaidSetupModal,
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    // Get the data entered
	  const tweetUrl = interaction.fields.getTextInputValue(tweetUrlInput.data.custom_id);
	  const requiredCommentText = interaction.fields.getTextInputValue(requiredCommentTextInput.data.custom_id);
    const reward = interaction.fields.getTextInputValue(rewardInput.data.custom_id);
    // Get Mentioned Channel 
    const message = interaction.channel.messages.cache.get(interaction.message.id);
    const embed = message.embeds[0]
    const mentionedChannelId = stringUtils.getMentionedChannelIds(embed.description)[0];
    const mentionedChannel = interaction.client.channels.cache.get(mentionedChannelId);
    // Send Comment Reward Interaction into mentioned channel
    const embeds = [twitterActionRewardRaidEmbed(tweetUrl, requiredCommentText, reward)];
    const components = [
      new ActionRowBuilder().setComponents(
        claimCommentRewardsButton.data,
        claimLikeRewardsButton.data,
        claimRetweetRewardsButton.data
      ),
    ];
    const raidMessage = await mentionedChannel.send({ embeds, components });

    // Save raid details into db
    try {
      await twitterActionRewardRaidService.createTwitterActionRewardRaid({
        discordMessageId: raidMessage.id,
        tweetUrl,
        requiredCommentText,
        reward,
      });
    } catch (error) {
      console.log(error);
      await raidMessage.delete();
      await interaction.editReply('Error while posting raid');
      return;
    }

    await interaction.editReply(`Comment Attack Raid posted into <#${mentionedChannelId}>`);
  },
};