const { ActionRowBuilder } = require('discord.js');
const balanceButton = require('../buttons/balance.button');
const viewStoreItemsButton = require('../buttons/view-store-items.button');
const theStoreEmbed = require('../embeds/the-store.embed');

module.exports = {
  embeds: [theStoreEmbed],
  components: [
    new ActionRowBuilder().setComponents(
      viewStoreItemsButton.data,
      balanceButton.data
    ),
  ],
};
