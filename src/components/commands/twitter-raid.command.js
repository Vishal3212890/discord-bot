const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const createTwitterRaidModal = require('../modals/create-twitter-raid.modal');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('twitter-raid')
    .setDescription('Create Twitter Action Reward Raid')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('The channel to post raid')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const channelId = interaction.options.getChannel('channel').id;
    await interaction.showModal(createTwitterRaidModal.render(channelId));
  },
};
