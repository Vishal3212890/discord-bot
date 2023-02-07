const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const storeItemService = require('../../services/storeItem.service');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add-store-item')
    .setDescription('Add a New Store Item')
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('Name of the Item')
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName('role')
        .setDescription('Role  that will be assigned')
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('price')
        .setDescription('Price of the Item')
        .setMinValue(0)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true});

    const name = interaction.options.getString('name');
    const roleId = interaction.options.getRole('role').id;
    const price = interaction.options.getInteger('price');

    const itemExists = await storeItemService.itemExists({ name });
    if (itemExists) {
      return interaction.editReply('Item Already Exists');
    }

    await storeItemService.createItem({ name, roleId, price });

    interaction.editReply('New Item Added');
  },
};
