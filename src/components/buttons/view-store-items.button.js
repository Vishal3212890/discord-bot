const { ButtonStyle, ButtonBuilder } = require('discord.js');
const storeItemService = require('../../services/storeItem.service');
const viewStoreItemSelectMenu = require('../selectMenus/view-store-item.selectMenu');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('view-store-items')
    .setLabel('View Store Items')
    .setStyle(ButtonStyle.Success),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const items = await storeItemService.getAllItems();
    if (items.length === 0)
      return await interaction.editReply('No Available Items');

    const options = items.map((item) => {
      const label = item.name;
      const description = `Price: ${item.price}`;
      const value = item._id.toString();
      return { label, description, value };
    });

    await interaction.editReply({
      components: [viewStoreItemSelectMenu.render(options)],
    });
  },
};
