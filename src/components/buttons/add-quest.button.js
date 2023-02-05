const { ButtonBuilder, ButtonStyle } = require('discord.js');
const addManualQuestModal = require('../modals/add-manual-quest.modal');
const addQuestSelectMenu = require('../selectMenus/add-quest.selectMenu');

module.exports = {
  data: new ButtonBuilder()
    .setCustomId('add-quest')
    .setLabel('Add Quest')
    .setStyle(ButtonStyle.Success),
  async execute(interaction) {
    const options = [
      {
        label: 'Reach n Messages',
        value: 'reach_n_messages',
      },
      {
        label: 'Invite n People',
        value: 'invite_n_people',
      },
      {
        label: 'Add Reactions in Announcement',
        value: 'add_reactions_in_announcement',
      },
      {
        label: 'Boost the Server',
        value: 'boost_the_server',
      },
      {
        label: 'Manual Quest',
        value: 'manual_quest',
      },
    ];

    await interaction.reply({
      components: [addQuestSelectMenu.render(options)],
      ephemeral: true,
    });
  },
};
