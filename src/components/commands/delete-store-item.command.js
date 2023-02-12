const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const storeItemService = require('../../services/storeItem.service');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete-store-item')
    .setDescription('Delete a Store Item')
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('Name of the Item')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const name = interaction.options.getString('name');
    const item = await storeItemService.getItem({ name });
    if (!item) {
      return await interaction.editReply('Item Not Found');
    }

    await interaction.guild.roles.delete(item.roleId);

    await item.delete();

    interaction.editReply('Item Deleted');
  },
};
