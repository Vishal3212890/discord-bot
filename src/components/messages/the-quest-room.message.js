const { ActionRowBuilder } = require('discord.js');
const completedQuestsButton = require('../buttons/completed-quests.button');
const pendingQuestsButton = require('../buttons/pending-quests.button');
const viewQuestsButton = require('../buttons/view-quests.button');
const theQuestRoomEmbed = require('../embeds/the-quest-room.embed');

module.exports = {
  embeds: [theQuestRoomEmbed],
  components: [
    new ActionRowBuilder().setComponents(
      viewQuestsButton.data,
      pendingQuestsButton.data,
      completedQuestsButton.data
    ),
  ],
};
