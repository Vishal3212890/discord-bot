const { ButtonBuilder, ButtonStyle } = require('discord.js');
const twitterRaidService = require('../../services/twitterRaid.service');
const editTwitterRaidModal = require('../modals/edit-twitter-raid.modal');

const customIdPrefix = 'edit-twitter-raid-';

module.exports = {
  data: new ButtonBuilder()
    .setCustomId(customIdPrefix + '*')
    .setLabel('Edit Raid')
    .setStyle(ButtonStyle.Primary),

  render(id) {
    return this.data.setCustomId(customIdPrefix + id.toString());
  },

  getId(interaction) {
    return interaction.customId.substring(customIdPrefix.length);
  },

  async execute(interaction) {
    const twitterRaidId = this.getId(interaction);
    const twitterRaid = await twitterRaidService.getRaidById(
      twitterRaidId
    );

    await interaction.showModal(editTwitterRaidModal.render(twitterRaid));
  },
};
