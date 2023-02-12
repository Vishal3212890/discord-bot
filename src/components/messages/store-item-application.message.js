const { ActionRowBuilder } = require('discord.js');
const acceptStoreApplicationButton = require('../buttons/accept-store-application.button');
const rejectStoreApplicationButton = require('../buttons/reject-store-application.button');
const storeItemApplicationEmbed = require('../embeds/store-item-application.embed');

module.exports = (storeItemApplication) => {
  const { _id: id, user, storeItem } = storeItemApplication;

  return {
    embeds: [
      storeItemApplicationEmbed(user, storeItem),
    ],
    components: [
      new ActionRowBuilder().setComponents(
        acceptStoreApplicationButton.render(id),
        rejectStoreApplicationButton.render(id)
      ),
    ],
  };
};
