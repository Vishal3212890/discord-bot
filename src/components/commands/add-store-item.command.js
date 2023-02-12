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
    .addIntegerOption((option) =>
      option
        .setName('price')
        .setDescription('Price of the Item')
        .setMinValue(0)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const name = interaction.options.getString('name');
    const price = interaction.options.getInteger('price');

    const itemExists = await storeItemService.itemExists({ name });
    if (itemExists) {
      return await interaction.editReply('Item Already Exists');
    }

    const role = await interaction.guild.roles.create({
      name: 'SI - ' + name,
    });

    await storeItemService.createItem({ name, roleId: role.id, price });

    await interaction.editReply('New Item Added');
  },
};
