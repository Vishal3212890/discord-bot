const { SlashCommandBuilder } = require('discord.js');
const twitterService = require('../../services/twitter.service');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
  
    const discordId = interaction.user.id;
    const url = await twitterService.generateAuthUrl(discordId);

    await interaction.editReply(url);
  },
};
