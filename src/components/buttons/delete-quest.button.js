const { ButtonBuilder, ButtonStyle } = require('discord.js');
const manualQuestService = require('../../services/manualQuest.service');
const deleteQuestSelectMenu = require('../selectMenus/delete-quest.selectMenu');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('delete-quest')
    .setLabel('Delete Quest')
    .setStyle(ButtonStyle.Danger),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const quests = await manualQuestService.getAllManualQuests();

    if (quests.length === 0) await interaction.editReply('No available quests');

    const options = quests.map((q) => {
      return {
        label: q.name,
        description: q.description,
        value: q._id.toString(),
      };
    });

    await interaction.editReply({
      components: [deleteQuestSelectMenu.render(options)],
    });
  },
};
