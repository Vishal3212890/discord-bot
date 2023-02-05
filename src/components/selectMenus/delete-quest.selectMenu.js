const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const manualQuestService = require('../../services/manualQuest.service');

module.exports = {
  data: new StringSelectMenuBuilder()
    .setCustomId('delete-quest')
    .setPlaceholder('Select a Quest to Delete...'),

  render(options) {
    return new ActionRowBuilder().addComponents(this.data.addOptions(options));
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const questId = interaction.values[0];

    await manualQuestService.deleteManualQuest(questId);

    await interaction.editReply('Quest Deleted');
  },
};
