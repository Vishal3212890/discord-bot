const { ButtonBuilder, ButtonStyle } = require('discord.js');
const storeItemService = require('../../services/storeItem.service');
const userService = require('../../services/user.service');

const customIdPrefix = 'buy-store-item-*';

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('buy-store-item')
    .setLabel('Buy Now')
    .setStyle(ButtonStyle.Success),

  render(id) {
    return this.data.setCustomId(customIdPrefix + id.toString());
  },

  getId(interaction) {
    return interaction.customId.substring(customIdPrefix.length);
  },
  
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const id = this.getId(interaction);
    const discordId = interaction.user.id;

    const storeItem = await storeItemService.getItemById(id);
    if (!storeItem) {
      await interaction.editReply('Item not found');
      return;
    }

    if (storeItem.stock === 0) {
      await interaction.editReply('Item out of stock!');
      return;
    }

    const user = await userService.getUserByDiscordId(discordId);
    if (user.claimedBalance < storeItem.price) {
      await interaction.editReply('Not Enough Claimed Balance!');
      return;
    }

    await interaction.editReply('Processing...');
  },
};
