const { ActionRowBuilder } = require('discord.js');
const viewQuestsButton = require('../buttons/view-quests.button');
const theQuestRoomEmbed = require('../embeds/the-quest-room.embed');

module.exports = {
  embeds: [theQuestRoomEmbed],
  components: [new ActionRowBuilder().setComponents(viewQuestsButton.data)],
};
