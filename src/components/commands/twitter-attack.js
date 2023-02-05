const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
} = require('discord.js');
const twitterActionRewardRaidSetupButton = require('../buttons/twitter-action-reward-raid-setup.button');
const twitterActionRewardsRaidSetupEmbed = require('../embeds/twitter-action-rewards-raid-setup.embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('twitter-attack')
    .setDescription('Post Twitter Action Reward Raid')
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
      embeds: [twitterActionRewardsRaidSetupEmbed(channel)],
      components: [
        new ActionRowBuilder().setComponents(twitterActionRewardRaidSetupButton.data),
      ],
    };
    await interaction.reply(message);
  },
};
