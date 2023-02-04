const { SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
const twitterService = require('../../services/twitter.service');
const submitPinButton = require('../buttons/submit-pin.button');
const verifyTwitterAccountEmbed = require('../embeds/verify-twitter-account.embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    // await interaction.deferReply({ ephemeral: true });
  
    const discordId = interaction.user.id;
    const authUrl = await twitterService.generateAuthUrl(discordId);

    // await interaction.editReply(url);

    await interaction.reply({
      embeds: [verifyTwitterAccountEmbed(authUrl)],
      components: [
        new ActionRowBuilder().setComponents(submitPinButton.data),
      ],
      ephemeral: true,
    });
  },
};
