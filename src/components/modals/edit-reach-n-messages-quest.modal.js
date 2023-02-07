const { ModalBuilder, ActionRowBuilder } = require('discord.js');
const {
  nameInput,
  descriptionInput,
  numberOfMessagesInput,
  rewardInput,
} = require('../inputs/quest.inputs');
const questService = require('../../services/quest.service');
const { getInputValues } = require('../utils/input.util');

const customIdPrefix = 'edit-reach-n-messages-quest-';

module.exports = {
  data: new ModalBuilder()
    .setCustomId(customIdPrefix + '*')
    .setTitle('Edit Automated Quest'),

  render({ _id: id, name, description, numberOfMessages, reward }) {
    const actionsRows = [
      nameInput.setValue(name),
      descriptionInput.setValue(description),
      numberOfMessagesInput.setValue(numberOfMessages.toString()),
      rewardInput.setValue(reward.toString()),
    ].map((c) => new ActionRowBuilder().addComponents(c));

    const customId = customIdPrefix + id.toString();

    return this.data.setCustomId(customId).setComponents(...actionsRows);
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    // extract quest id
    const questId = interaction.customId.substring(customIdPrefix.length);

    // Get the data entered
    const [name, description, numberOfMessages, reward] = getInputValues(
      interaction,
      nameInput,
      descriptionInput,
      numberOfMessagesInput,
      rewardInput
    );

    await questService.updateQuest(questId, {
      name,
      description,
      numberOfMessages,
      reward,
    });

    await interaction.editReply('Automated Quest Updated');
  },
};
