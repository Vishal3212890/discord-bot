const { ActionRowBuilder } = require("discord.js");
const addQuestButton = require("../buttons/add-quest.button");
const deleteQuestButton = require("../buttons/delete-quest.button");
const editQuestButton = require("../buttons/edit-quest.button");
const questsAdminPanelEmbed = require("../embeds/quest-admin-panel.embed");

module.exports = {
  embeds: [questsAdminPanelEmbed],
  components: [
    new ActionRowBuilder().setComponents(
      addQuestButton.data,
      editQuestButton.data,
      deleteQuestButton.data
    ),
  ],
};