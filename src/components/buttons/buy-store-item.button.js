const { ButtonBuilder, ButtonStyle } = require('discord.js');
const storeItemService = require('../../services/storeItem.service');
const userService = require('../../services/user.service');
const storeItemApplicationMessage = require('../messages/store-item-application.message');

const { DISCORD_STORE_APPLICATIONS_ID } = process.env;

const customIdPrefix = 'buy-store-item-';

module.exports = {
  data: new ButtonBuilder()
    .setCustomId(customIdPrefix + '*')
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
      return await interaction.editReply('Item not found');
    }

    if (interaction.member.roles.cache.has(storeItem.roleId)) {
      return await interaction.editReply('You already have this Item');
    }

    if (storeItem.stock === 0) {
      return await interaction.editReply('Item out of stock!');
    }

    const user = await userService.getUserByDiscordId(discordId);
    if (user.claimedBalance < storeItem.price) {
      return await interaction.editReply('Not Enough Claimed Balance!');
    }

    await userService.decreaseClaimedBalance(user._id, storeItem.price);
    await storeItemService.decreaseStock(storeItem._id);

    try {
      const role = interaction.guild.roles.cache.get(storeItem.roleId);
      await interaction.member.roles.add(role);
    } catch (error) {
      await userService.increaseClaimedBalance(user._id, storeItem.price);
      await storeItemService.increaseStock(storeItem._id);
      return await interaction.editReply('Unable to buy Item');
    }

    const storeItemApplication = await storeItemService.createStoreItemApplication(user._id, storeItem._id);
    const channels = interaction.client.channels.cache;
    const storeApplicationChannel = channels.get(DISCORD_STORE_APPLICATIONS_ID);

    await storeApplicationChannel.send(storeItemApplicationMessage(storeItemApplication));

    await interaction.editReply('Successfully Bought Item');
  },
};
