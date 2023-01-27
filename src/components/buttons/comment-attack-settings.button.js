const { ButtonBuilder, ButtonStyle } = require('discord.js');
const commentAttackSettingsModal = require('../modals/comment-attack-setting.modal');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('comment-attack-settings')
    .setLabel('Comment Attack Settings')
    .setStyle(ButtonStyle.Primary),
  async execute(interaction) {
    await interaction.showModal(commentAttackSettingsModal);
  },
};
