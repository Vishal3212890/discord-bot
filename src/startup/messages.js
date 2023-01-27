const { ActionRowBuilder } = require('discord.js');
const balanceButton = require('../components/buttons/balance.button');
const claimRatesButton = require('../components/buttons/claim-rates.button');
const claimButton = require('../components/buttons/claim.button');
const commentAttackSettingsButton = require('../components/buttons/comment-attack-settings.button');
const commentAttackRaidSetupEmbed = require('../components/embeds/comment-attack-raid-setup.embed');
const theBankEmbed = require('../components/embeds/the-bank.embed');

const { DISCORD_THE_BANK_CHANNEL_ID, DISCORD_COMMENT_ATTACK_CHANNEL_ID } = process.env;

module.exports = async function (client) {
  const theBankMessage = {
    embeds: [theBankEmbed],
    components: [
      new ActionRowBuilder().setComponents(
        claimRatesButton.data,
        balanceButton.data,
        claimButton.data
      ),
    ],
  };
  const theBankChannel = client.channels.cache.get(DISCORD_THE_BANK_CHANNEL_ID);
  const theBankChannelMessages = await theBankChannel.messages.fetch();
  if (theBankChannelMessages.size === 0) theBankChannel.send(theBankMessage);

  const commentAttackChannelMessage = {
    embeds: [commentAttackRaidSetupEmbed],
    components: [new ActionRowBuilder().setComponents(commentAttackSettingsButton.data)]
  }
  const commentAttackChannel = client.channels.cache.get(DISCORD_COMMENT_ATTACK_CHANNEL_ID);
  const commentAttackChannelMessages = await commentAttackChannel.messages.fetch();
  if (commentAttackChannelMessages.size === 0) commentAttackChannel.send(commentAttackChannelMessage);
};
