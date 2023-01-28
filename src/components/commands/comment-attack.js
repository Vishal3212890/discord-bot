const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
} = require('discord.js');
const commentAttackSettingsButton = require('../buttons/comment-attack-settings.button');
const commentAttackRaidSetupEmbed = require('../embeds/comment-attack-raid-setup.embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('comment-attack')
    .setDescription('Select a channel to post Comment Attack Raid embed')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('The channel to post embed')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const channel = interaction.options._hoistedOptions[0].channel.id;
    const message = {
      embeds: [commentAttackRaidSetupEmbed(channel)],
      components: [
        new ActionRowBuilder().setComponents(commentAttackSettingsButton.data),
      ],
    };
    await interaction.reply(message);
  },
};
