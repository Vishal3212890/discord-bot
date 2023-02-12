const { ButtonBuilder, ButtonStyle } = require('discord.js');
const userService = require('../../services/user.service');
const questService = require('../../services/quest.service');
const viewQuestSelectMenu = require('../selectMenus/view-quest.selectMenu');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('completed-quests')
    .setLabel('Completed Quests')
    .setStyle(ButtonStyle.Success),
    
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const user = await userService.getUserByDiscordId(interaction.user.id);
    
    const quests = await questService.getCompletedQuests(user._id);

    if (quests.length === 0) 
      return await interaction.editReply('No available quests');

    const options = quests.map((q) => {
      return { label: q.name, value: q._id.toString() };
    });

    await interaction.editReply({
      components: [viewQuestSelectMenu.render(options)]
    });
  },
};
