const { ButtonStyle, ButtonBuilder } = require('discord.js');
const questService = require('../../services/quest.service');

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

    await questService.rejectQuestApplication(questApplicationId);

    await interaction.message.delete();

    await interaction.editReply('Quest Application Rejected');
  },
};
