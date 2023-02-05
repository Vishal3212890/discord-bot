const { ModalBuilder, ActionRowBuilder } = require('discord.js');
const {
  nameInput,
  descriptionInput,
  rewardInput,
} = require('../inputs/quest.inputs');
const questService = require('../../services/quest.service');

module.exports = {
  data: new ModalBuilder()
    .setCustomId('edit-manual-quest-*')
    .setTitle('Edit Manual Quest'),

  render(id, name, description, reward) {
    const actionsRows = [
      nameInput.setValue(name),
      descriptionInput.setValue(description),
      rewardInput.setValue(reward),
    ].map((c) => new ActionRowBuilder().addComponents(c));

    const customId = this.data.data.custom_id.replace('*', id.toString());

    return this.data.setCustomId(customId).addComponents(...actionsRows);
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    // extract quest id
    const questId = interaction.customId.substring(
      'edit-manual-quest-'.length
    );

    // Get the data entered
    const name = interaction.fields.getTextInputValue(nameInput.data.custom_id);
    const description = interaction.fields.getTextInputValue(
      descriptionInput.data.custom_id
    );
    const reward = interaction.fields.getTextInputValue(
      rewardInput.data.custom_id
    );

    await questService.updateQuest(questId, {
      name,
      description,
      reward,
    });

    await interaction.editReply('Manual Quest Updated');
  },
};
