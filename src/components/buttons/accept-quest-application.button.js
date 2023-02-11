const { ButtonStyle, ButtonBuilder } = require('discord.js');
const questService = require('../../services/quest.service');

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

    await questService.acceptQuestApplication(questApplicationId);

    await interaction.message.delete();

    interaction.editReply('Quest Application Accepted');
  },
};
