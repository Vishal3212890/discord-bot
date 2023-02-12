const { ButtonStyle, ButtonBuilder } = require('discord.js');
const storeItemService = require('../../services/storeItem.service');
const logger = require('../utils/logger');

const customIdPrefix = 'buy-store-application-';

module.exports = {
  data: new ButtonBuilder()
    .setCustomId(customIdPrefix + '*')
    .setLabel('Complete')
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
    const { user, storeItem } = await storeItemApplication.populate('user storeItem');

    const role = interaction.guild.roles.cache.get(storeItem.roleId);
    await interaction.member.roles.remove(role);
    
    await interaction.message.delete();
    
    await storeItemApplication.delete();

    await logger.logStoreApplicationAcceptedLog(interaction.client, user, storeItem);

    interaction.editReply('Buy Request Completed');
  },
};
