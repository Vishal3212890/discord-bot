const { ActionRowBuilder } = require("discord.js");
const addQuestButton = require("../components/buttons/add-quest.button");
const deleteQuestButton = require("../components/buttons/delete-quest.button");
const editQuestButton = require("../components/buttons/edit-quest.button");
const manualQuestsAdminPanelEmbed = require("../components/embeds/manual-quests-admin-panel.embed");

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