const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const claimRateService = require('../../services/claimRate.service');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('edit-claim-rate')
    .setDescription('Edit a Claim Rate')
    .addRoleOption((option) =>
      option
        .setName('role')
        .setDescription('Role of Claim Rate')
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('rate')
        .setDescription('New Claim Rate')
        .setMinValue(0)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const roleId = interaction.options.getRole('role').id;
    const rate = interaction.options.getInteger('rate');

    const claimRate = await claimRateService.getClaimRate({ roleId });
    if (!claimRate) {
      return await interaction.editReply('Claim Rate Not Found');
    }

    await claimRateService.updateClaimRate(claimRate._id, { roleId, rate });

    await interaction.editReply('Claim Rate Updated');
  },
};
