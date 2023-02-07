const { SlashCommandBuilder, inlineCode, ActionRowBuilder } = require('discord.js');
const questApplicationEmbed = require('../embeds/quest-application.embed');
const questService = require('../../services/quest.service');
const userService = require('../../services/user.service');
const acceptQuestApplicationButton = require('../buttons/accept-quest-application.button');
const rejectQuestApplicationButton = require('../buttons/reject-quest-application.button');

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

    const quest = await questService.getQuest({ name: questName, type: 'manual_quest' });
    if (!quest) {
      await interaction.editReply(`Quest ${inlineCode(questName)} Not Found`);
      return;
    }

    const user = await userService.getUserByDiscordId(discordId);
    
    const rewardClaimed = await questService.questRewardClaimed(user._id, quest._id);
    if (rewardClaimed) return await interaction.editReply('Quest Reward Already Claimed');

    const questApplicationSubmitted = await questService.questApplicationSubmitted(user._id, quest._id);
    if (questApplicationSubmitted) return await interaction.editReply('Quest Application Already Submitted');

    const questApplication = await questService.createQuestApplication(user._id, quest._id);

    const channels = interaction.client.channels.cache;
    const questApplicationChannel = channels.get(DISCORD_QUEST_APPLICATIONS_CHANNEL_ID);

    await questApplicationChannel.send({
      embeds: [questApplicationEmbed(discordId, questName, imageUrl)],
      components: [
        new ActionRowBuilder().setComponents(
          acceptQuestApplicationButton.render(questApplication._id),
          rejectQuestApplicationButton.render(questApplication._id)
        )
      ],
    });

    await interaction.editReply('Quest Submitted for Review');
  },
};
