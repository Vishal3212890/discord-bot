const { ActionRowBuilder } = require("discord.js");
const addQuestButton = require("../buttons/add-quest.button");
const deleteQuestButton = require("../buttons/delete-quest.button");
const editQuestButton = require("../buttons/edit-quest.button");
const manualQuestsAdminPanelEmbed = require("../embeds/manual-quests-admin-panel.embed");

module.exports = {
  embeds: [manualQuestsAdminPanelEmbed],
  components: [
    new ActionRowBuilder().setComponents(
      addQuestButton.data,
      editQuestButton.data,
      deleteQuestButton.data
    ),
  ],
};