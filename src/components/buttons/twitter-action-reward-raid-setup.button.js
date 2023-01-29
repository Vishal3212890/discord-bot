const { ButtonBuilder, ButtonStyle } = require('discord.js');
const twitterActionRewardRaidSetupModal = require('../modals/twitter-action-reward-raid-setup.modal');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('comment-attack-settings')
    .setLabel('Comment Attack Settings')
    .setStyle(ButtonStyle.Primary),
  async execute(interaction) {
    await interaction.showModal(twitterActionRewardRaidSetupModal.data);
  },
};
