const { ButtonBuilder, ButtonStyle } = require('discord.js');
const submitPinModal = require('../modals/submit-pin.modal');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('submit-pin')
    .setLabel('Submit PIN')
    .setStyle(ButtonStyle.Success),
  async execute(interaction) {
    await interaction.showModal(submitPinModal.data);
  },
};
