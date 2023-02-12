const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const claimRateService = require('../../services/claimRate.service');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete-claim-rate')
    .setDescription('Delete a Claim Rate')
    .addRoleOption((option) =>
      option
        .setName('role')
        .setDescription('Role of Claim Rate')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const roleId = interaction.options.getRole('role').id;

    const claimRate = await claimRateService.getClaimRate({ roleId });
    if (!claimRate) {
      return await interaction.editReply('Claim Rate Nor Found');
    }

    await claimRate.delete();

    await interaction.editReply('Claim Rate Updated');
  },
};
