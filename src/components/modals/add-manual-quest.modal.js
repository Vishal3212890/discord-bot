const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

const addManualQuestModal = new ModalBuilder()
  .setCustomId('add-manual-quest-modal')
  .setTitle('Add Manual Quest');

const nameInput = new TextInputBuilder()
  .setCustomId('name-input')
  .setLabel('Name')
  .setStyle(TextInputStyle.Short);

const descriptionInput = new TextInputBuilder()
  .setCustomId('description-input')
  .setLabel('Description')
  .setStyle(TextInputStyle.Paragraph);

const rewardInput = new TextInputBuilder()
  .setCustomId('reward-input')
  .setLabel('Reward')
  .setStyle(TextInputStyle.Short);

const limitInput = new TextInputBuilder()
  .setCustomId('limit-input')
  .setLabel('Limit')
  .setRequired(false)
  .setPlaceholder('Limit is optional')
  .setStyle(TextInputStyle.Short);

const actionsRows = [nameInput, descriptionInput, rewardInput, limitInput].map(
  (c) => new ActionRowBuilder().addComponents(c)
);

module.exports = {
  data: addManualQuestModal.addComponents(...actionsRows),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.editReply(`Test`);
  },
};
