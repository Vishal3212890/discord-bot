const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const questService = require('../../services/quest.service');
const editManualQuestModal = require('../modals/edit-manual-quest.modal');

module.exports = {
  data: new StringSelectMenuBuilder()
    .setCustomId('edit-quest')
    .setPlaceholder('Select a Quest to Edit...'),

  render(options) {
    return new ActionRowBuilder().addComponents(this.data.addOptions(options));
  },

  async execute(interaction) {
    const questId = interaction.values[0];

    const quest = await questService.getQuestById(questId);
    if (!quest) return interaction.Reply('Quest Not Found');

    const { _id, name, description, reward } = quest;

    await interaction.showModal(editManualQuestModal.render(_id, name, description, reward.toString()));
  },
};