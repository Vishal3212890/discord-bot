const { ButtonStyle, ButtonBuilder } = require("discord.js");
const storeItemService = require('../../services/storeItem.service');
const logger = require("../utils/logger");

const customIdPrefix = 'reject-store-application-';

module.exports = {
  data: new ButtonBuilder()
    .setCustomId(customIdPrefix + '*')
    .setLabel('Reject')
    .setStyle(ButtonStyle.Danger),

  render(id) {
    return this.data.setCustomId(customIdPrefix + id.toString());
  },

  getId(interaction) {
    return interaction.customId.substring(customIdPrefix.length);
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true});

    const applicationId = this.getId(interaction);

    const storeItemApplication = await storeItemService.getStoreItemApplicationById(applicationId);
    await storeItemApplication.populate('user storeItem');

    const { user, storeItem } = storeItemApplication;

    const role = interaction.guild.roles.cache.get(storeItem.roleId);
    await interaction.member.roles.remove(role);

    await storeItemService.rejectStoreItemApplication(applicationId);

    await logger.logStoreApplicationRejectedLog(interaction.client, user, storeItem);

    await interaction.message.delete();

    await interaction.editReply('Quest Application Rejected');
  },
};