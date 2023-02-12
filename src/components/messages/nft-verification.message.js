const { ActionRowBuilder } = require('discord.js');
const verifyNftButton = require('../buttons/verify-nft.button');
const nftVerificationEmbed = require('../embeds/nft-verification.embed');

module.exports = {
  embeds: [nftVerificationEmbed],
  components: [new ActionRowBuilder().setComponents(verifyNftButton.data)],
};
