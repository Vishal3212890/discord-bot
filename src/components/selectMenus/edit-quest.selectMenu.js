const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const questService = require('../../services/quest.service');
const editInviteNPeopleQuestModal = require('../modals/edit-invite-n-people-quest.modal');
const editManualQuestModal = require('../modals/edit-manual-quest.modal');
const editReachNMessagesQuestModal = require('../modals/edit-reach-n-messages-quest.modal');
const editReactionsInAnnouncementQuestModal = require('../modals/edit-reactions-in-announcement-quest.modal');
const editServerBootQuestModal = require('../modals/edit-server-boot-quest.modal');

module.exports = {
  data: new StringSelectMenuBuilder()
    .setCustomId('edit-quest')
    .setPlaceholder('Select a Quest to Edit...'),

  render(options) {
    return new ActionRowBuilder().addComponents(this.data.setOptions(options));
  },

  async execute(interaction) {
    const questId = interaction.values[0];

    const quest = await questService.getQuestById(questId);
    if (!quest) return interaction.Reply('Quest Not Found');

    const { type } = quest;
    
    switch (type) {
      case 'reach_n_messages':
        await interaction.showModal(editReachNMessagesQuestModal.render(quest));
        break;
      case 'invite_n_people':
        await interaction.showModal(editInviteNPeopleQuestModal.render(quest));
        break;
      case 'add_reactions_in_announcement':
        await interaction.showModal(editReactionsInAnnouncementQuestModal.render(quest));
        break;
      case 'boost_the_server':
        await interaction.showModal(editServerBootQuestModal.render(quest));
        break;
      case 'manual_quest':
        await interaction.showModal(editManualQuestModal.render(quest));
        break;
      default:
        await interaction.reply('Quest Type Not Supported');
    }
  },
};