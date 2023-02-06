const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const addInviteNPeopleQuestModal = require('../modals/add-invite-n-people-quest.modal');
const addManualQuestModal = require('../modals/add-manual-quest.modal');
const addReachNMessagesQuestModal = require('../modals/add-reach-n-messages-quest.modal');
const addReactionsInAnnouncementQuestModal = require('../modals/add-reactions-in-announcement-quest.modal');
const addServerBootQuestModal = require('../modals/add-server-boot-quest.modal');

module.exports = {
  data: new StringSelectMenuBuilder()
    .setCustomId('add-quest')
    .setPlaceholder('Select a Quest to Create...'),

  render(options) {
    return new ActionRowBuilder().addComponents(this.data.setOptions(options));
  },

  async execute(interaction) {
    const questType = interaction.values[0];

    switch (questType) {
      case 'reach_n_messages':
        await interaction.showModal(addReachNMessagesQuestModal.data);
        break;
      case 'invite_n_people':
        await interaction.showModal(addInviteNPeopleQuestModal.data);
        break;
      case 'add_reactions_in_announcement':
        await interaction.showModal(addReactionsInAnnouncementQuestModal.data);
        break;
      case 'boost_the_server':
        await interaction.showModal(addServerBootQuestModal.data);
        break;
      case 'manual_quest':
        await interaction.showModal(addManualQuestModal.data);
        break;
      default:
        await interaction.reply('Quest Type Not Supported', { ephemeral: true });
    }
  },
};
