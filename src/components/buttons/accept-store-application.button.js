const { ButtonStyle, ButtonBuilder } = require('discord.js');
const storeItemService = require('../../services/storeItem.service');
const logger = require('../utils/logger');

const customIdPrefix = 'buy-store-application-';

module.exports = {
  data: new ButtonBuilder()
    .setCustomId(customIdPrefix + '*')
    .setLabel('Accept')
    .setStyle(ButtonStyle.Success),

  render(id) {
    return this.data.setCustomId(customIdPrefix + id.toString());
  },

  getId(interaction) {
    return interaction.customId.substring(customIdPrefix.length);
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const applicationId = this.getId(interaction);
    const storeItemApplication = await storeItemService.getStoreItemApplicationById(applicationId);
    await storeItemApplication.populate('user storeItem');

    const { user, storeItem } = storeItemApplication;

    await logger.logStoreApplicationAcceptedLog(interaction.client, user, storeItem);

    await interaction.message.delete();

    await storeItemApplication.delete();

    interaction.editReply('Buy Request Accepted');
  },
};
