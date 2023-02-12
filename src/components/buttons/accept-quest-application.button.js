const { ButtonStyle, ButtonBuilder } = require('discord.js');
const questService = require('../../services/quest.service');
const logger = require('../utils/logger');

const customIdPrefix = 'accept-quest-application-';

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

    const questApplicationId = this.getId(interaction);

    const { user, quest } = await questService.getQuestApplicationById(questApplicationId).populate('user quest');

    await questService.acceptQuestApplication(questApplicationId);

    await logger.logQuestApplicationAcceptedLog(interaction.client, user, quest);

    await interaction.message.delete();

    interaction.editReply('Quest Application Accepted');
  },
};
