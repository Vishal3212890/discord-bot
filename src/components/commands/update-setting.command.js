const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const settingService = require('../../services/setting.service');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('update-setting')
    .setDescription('Update Application Settings')
    .addStringOption((option) =>
      option
        .setName('setting-name')
        .setDescription('Name of Setting Property')
        .addChoices(
          { name: 'Minimum Claim Amount', value: 'minimumClaimAmount' },
          { name: 'NFT Reward', value: 'nftReward' }
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('value')
        .setDescription('Value of Setting Property')
        .setMinValue(0)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const settingName = interaction.options.getString('setting-name');
    const value = interaction.options.getInteger('value');

    await settingService.updateSetting({ [settingName]: value });

    await interaction.editReply('Setting updated');
  },
};
