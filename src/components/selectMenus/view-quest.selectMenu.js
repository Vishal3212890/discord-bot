const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const questService = require('../../services/quest.service');
const claimRewardButton = require('../buttons/claim-reward.button');
const automatedQuestDetailsEmbed = require('../embeds/automated-quest-details.embed');

const manualQuestDetailsEmbed = require('../embeds/manual-quest-details.embed');

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

    const { name, description, reward, type } = await questService.getQuestById(questId);

    if (type === 'manual') {
      await interaction.editReply({
        embeds: [manualQuestDetailsEmbed(name, description, reward)],
      });
    } else {
      await interaction.editReply({
        embeds: [automatedQuestDetailsEmbed(name, description, reward)],
        components: [
          new ActionRowBuilder().setComponents(claimRewardButton.data),
        ],
      });
    }
  },
};
