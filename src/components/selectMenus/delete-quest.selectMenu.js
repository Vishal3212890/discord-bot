const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const questService = require('../../services/quest.service');

module.exports = {
  data: new StringSelectMenuBuilder()
    .setCustomId('delete-quest')
    .setPlaceholder('Select a Quest to Delete...'),

  render(options) {
    return new ActionRowBuilder().addComponents(this.data.setOptions(options));
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const questId = interaction.values[0];

    await questService.deleteQuest(questId);

    await interaction.editReply('Quest Deleted');
  },
};
