const { ActionRowBuilder } = require('discord.js');
const twitterService = require('../../services/twitter.service');
const verifyTwitterAccountEmbed = require('../embeds/verify-twitter-account.embed');
const submitPinButton = require('../buttons/submit-pin.button');

exports.handleTwitterAuth = async (interaction) => {
  const discordId = interaction.user.id;
  const authUrl = await twitterService.generateAuthUrl(discordId);

  await interaction.editReply({
    embeds: [verifyTwitterAccountEmbed(authUrl)],
    components: [new ActionRowBuilder().setComponents(submitPinButton.data)],
    ephemeral: true,
  });
};
