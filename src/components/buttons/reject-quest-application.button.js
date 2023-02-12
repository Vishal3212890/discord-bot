const { ButtonStyle, ButtonBuilder } = require('discord.js');
const questService = require('../../services/quest.service');
const logger = require('../utils/logger');

const customIdPrefix = 'reject-quest-application-';

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
    await interaction.deferReply({ ephemeral: true });

    const questApplicationId = this.getId(interaction);

    const { user, quest } = await questService.getQuestApplicationById(questApplicationId).populate('user quest');

    await questService.rejectQuestApplication(questApplicationId);

    await logger.logStoreApplicationRejectedLog(interaction.client, user, quest);

    await interaction.message.delete();

    await interaction.editReply('Quest Application Rejected');
  },
};
