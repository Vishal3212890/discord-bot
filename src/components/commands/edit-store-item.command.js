const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const storeItemService = require('../../services/storeItem.service');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('edit-store-item')
    .setDescription('Edit a Store Item')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('name')
        .setDescription('Edit Item Name')
        .addStringOption((option) =>
          option
            .setName('item')
            .setDescription('Item Name')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName('name').setDescription('New Name').setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('price')
        .setDescription('Edit Item Price')
        .addStringOption((option) =>
          option
            .setName('item')
            .setDescription('Item Name')
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName('price')
            .setDescription('Price of the Item')
            .setMinValue(0)
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('description')
        .setDescription('Edit Item Description')
        .addStringOption((option) =>
          option
            .setName('item')
            .setDescription('Item Name')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('description')
            .setDescription('Description of the Item')
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('stock')
        .setDescription('Edit Item Stock')
        .addStringOption((option) =>
          option
            .setName('item')
            .setDescription('Item Name')
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option.setName('stock').setDescription('Stock of the Item')
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const itemName = interaction.options.getString('item').trim();

    const item = await storeItemService.getItem({ name: itemName });
    if (!item) {
      return await interaction.editReply('Item Not Found');
    }

    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'name':
        item.name = interaction.options.getString('name');
        break;
      case 'price':
        item.price = interaction.options.getInteger('price');
        break;
      case 'description':
        item.description = interaction.options.getString('description');
        break;
      case 'stock':
        item.stock = interaction.options.getInteger('stock');
        break;
    }

    await item.save();

    await interaction.editReply('Item Updated');
  },
};
