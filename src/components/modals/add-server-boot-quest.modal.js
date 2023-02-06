const { ModalBuilder, ActionRowBuilder } = require('discord.js');
const questService = require('../../services/quest.service');
const {
  nameInput,
  descriptionInput,
  rewardInput,
} = require('../inputs/quest.inputs');

const actionsRows = [nameInput, descriptionInput, rewardInput].map((c) =>
  new ActionRowBuilder().addComponents(c)
);

module.exports = {
  data: new ModalBuilder()
    .setCustomId('add-server-boost-quest')
    .setTitle('Add Automated Quest')
    .addComponents(...actionsRows),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    // Get the data entered
    const name = interaction.fields.getTextInputValue(nameInput.data.custom_id);
    const description = interaction.fields.getTextInputValue(descriptionInput.data.custom_id);
    const reward = interaction.fields.getTextInputValue(rewardInput.data.custom_id);

    const questDetails = {
      name,
      description,
      reward,
      type: 'boost_the_server',
    };

    await questService.createQuest(questDetails);

    await interaction.editReply('Automated Quest Created');
  },
};
