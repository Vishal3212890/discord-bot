const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const claimRateService = require('../../services/claimRate.service');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add-claim-rate')
    .setDescription('Add a New Claim Rate')
    .addRoleOption((option) =>
      option
        .setName('role')
        .setDescription('Role of Claim Rate')
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('rate')
        .setDescription('Rate of the Claim Rate')
        .setMinValue(0)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const roleId = interaction.options.getRole('role').id;
    const rate = interaction.options.getInteger('rate');

    const claimRateExists = await claimRateService.claimRateExists({ roleId });
    if (claimRateExists) {
      return await interaction.editReply('Claim Rate Already Exists');
    }

    await claimRateService.createClaimRate({ roleId, rate });

    await interaction.editReply('New Claim Rate Added');
  },
};
