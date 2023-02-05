const { SlashCommandBuilder, inlineCode } = require('discord.js');
const questApplicationEmbed = require('../embeds/quest-application.embed');
const questService = require('../../services/quest.service');

const { DISCORD_QUEST_APPLICATIONS_CHANNEL_ID } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('submit-quest')
    .setDescription('Submits the quest for admins review')
    .addStringOption((option) =>
      option
        .setName('quest')
        .setDescription('Name of the quest')
        .setRequired(true)
    )
    .addAttachmentOption((option) =>
      option
        .setName('image')
        .setDescription('Screenshot Evidence')
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const discordId = interaction.user.id;
    const questName = interaction.options._hoistedOptions[0].value.trim();
    const imageUrl = interaction.options._hoistedOptions[1].attachment.url;

    const questExists = await questService.questExists({ name: questName });
    if (!questExists)
      return await interaction.editReply(`Quest ${inlineCode(questName)} Not Found`);

    const questApplicationChannel = interaction.client.channels.cache.get(DISCORD_QUEST_APPLICATIONS_CHANNEL_ID);

    await questApplicationChannel.send({
      embeds: [questApplicationEmbed(discordId, questName, imageUrl)],
    });

    await interaction.editReply('Quest Submitted for Review');
  },
};
