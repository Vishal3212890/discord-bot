const { ActionRowBuilder } = require("discord.js");
const balanceButton = require("../components/buttons/balance.button");
const claimRatesButton = require("../components/buttons/claim-rates.button");
const claimButton = require("../components/buttons/claim.button");
const theBankEmbed = require("../components/embeds/the-bank.embed");

module.exports = {
  embeds: [theBankEmbed],
  components: [
    new ActionRowBuilder().setComponents(
      claimRatesButton.data,
      balanceButton.data,
      claimButton.data
    ),
  ],
};