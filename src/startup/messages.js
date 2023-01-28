const { ActionRowBuilder } = require('discord.js');
const balanceButton = require('../components/buttons/balance.button');
const claimRatesButton = require('../components/buttons/claim-rates.button');
const claimButton = require('../components/buttons/claim.button');
const theBankEmbed = require('../components/embeds/the-bank.embed');

const { DISCORD_THE_BANK_CHANNEL_ID } = process.env;

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
};
