const { ActionRowBuilder } = require("discord.js");
const theBankEmbed = require("../embeds/the-bank.embed");
const claimRatesButton = require("../buttons/claim-rates.button");
const balanceButton = require("../buttons/balance.button");
const claimButton = require("../buttons/claim.button");

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