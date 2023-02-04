const { ButtonBuilder, ButtonStyle } = require('discord.js');
const addManualQuestModal = require('../modals/add-manual-quest.modal');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('add-quest')
    .setLabel('Add Quest')
    .setStyle(ButtonStyle.Success),
  async execute(interaction) {
    await interaction.showModal(addManualQuestModal.data);
  },
};
