const { SlashCommandBuilder, ActionRowBuilder } = require('discord.js');
const twitterService = require('../../services/twitter.service');
const submitPinButton = require('../buttons/submit-pin.button');
const verifyTwitterAccountEmbed = require('../embeds/verify-twitter-account.embed');
const DiscordService = require('../../services/discord.service');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
    
  async execute(interaction) {
    await interaction.reply('Pong');
  },
};
