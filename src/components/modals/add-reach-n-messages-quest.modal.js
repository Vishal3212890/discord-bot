const { ModalBuilder, ActionRowBuilder } = require('discord.js');
const questService = require('../../services/quest.service');
const {
  nameInput,
  descriptionInput,
  numberOfMessagesInput,
  rewardInput,
} = require('../inputs/quest.inputs');

const actionsRows = [nameInput, descriptionInput, numberOfMessagesInput, rewardInput].map((c) =>
  new ActionRowBuilder().addComponents(c)
);

module.exports = {
  data: new ModalBuilder()
    .setCustomId('add-reach-n-messages-quest')
    .setTitle('Add Automated Quest')
    .addComponents(...actionsRows),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    // Get the data entered
    const name = interaction.fields.getTextInputValue(nameInput.data.custom_id);
    const description = interaction.fields.getTextInputValue(descriptionInput.data.custom_id);
    const numberOfMessages = interaction.fields.getTextInputValue(numberOfMessagesInput.data.custom_id);
    const reward = interaction.fields.getTextInputValue(rewardInput.data.custom_id);

    const questDetails = {
      name,
      description,
      reward,
      numberOfMessages,
      type: 'automated',
    };

    await questService.createQuest(questDetails);

    await interaction.editReply('Automated Quest Created');
  },
};
