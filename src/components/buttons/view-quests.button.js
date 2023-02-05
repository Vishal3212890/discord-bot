const { ButtonBuilder, ButtonStyle } = require('discord.js');
const questService = require('../../services/quest.service');
const viewQuestSelectMenu = require('../selectMenus/view-quest.selectMenu');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('view-quests')
    .setLabel('View Quests')
    .setStyle(ButtonStyle.Success),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true});

    const quests = await questService.getAllQuests();
    if (quests.length === 0) 
      return await interaction.editReply('No available quests');

    const options = quests.map((q) => {
      return { label: q.name, description: q.description, value: q._id.toString() };
    });

    await interaction.editReply({
      components: [viewQuestSelectMenu.render(options)]
    });
  },
};
