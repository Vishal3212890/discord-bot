const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const manualQuestService = require('../../services/manualQuest.service');
const questDetailsEmbed = require('../embeds/quest-details.embed');

module.exports = {
  data: new StringSelectMenuBuilder()
    .setCustomId('view-quest')
    .setPlaceholder('Select a Quest to View...'),

  render(options) {
    return new ActionRowBuilder().addComponents(this.data.addOptions(options));
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const questId = interaction.values[0];

    const { name, description, reward } =
      await manualQuestService.getManualQuestById(questId);

    await interaction.editReply({
      embeds: [questDetailsEmbed(name, description, reward)],
    });
  },
};
