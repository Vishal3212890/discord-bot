const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const storeItemService = require('../../services/storeItem.service');
const storeItemDetailsEmbed = require('../embeds/store-item-details.embed');

module.exports = {
  data: new StringSelectMenuBuilder()
    .setCustomId('view-store-item')
    .setPlaceholder('Select a Item to View...'),

  render(options) {
    return new ActionRowBuilder().addComponents(this.data.setOptions(options));
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const itemId = interaction.values[0];

    const item = await storeItemService.getItemById(itemId);
    if (!item) {
      return interaction.editReply({ content: 'Item not found' });
    }

    await interaction.editReply({
      embeds: [storeItemDetailsEmbed(item)],
    });
  },
};
