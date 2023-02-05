const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');
const manualQuestService = require('../../services/manualQuest.service');

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

module.exports = {
  data: new ModalBuilder()
    .setCustomId('edit-manual-quest-modal-*')
    .setTitle('Edit Manual Quest'),

  render(id, name, description, reward) {
    const actionsRows = [
      nameInput.setValue(name),
      descriptionInput.setValue(description),
      rewardInput.setValue(reward)
    ].map((c) => new ActionRowBuilder().addComponents(c));

    const customId = this.data.data.custom_id;
    const newCustomId = customId.replace('*', id.toString());

    return this.data.setCustomId(newCustomId).addComponents(...actionsRows);
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    // extract quest id
    const questId = interaction.customId.substring('edit-manual-quest-modal-'.length);
    
    // Get the data entered
    const name = interaction.fields.getTextInputValue(nameInput.data.custom_id);
    const description = interaction.fields.getTextInputValue(descriptionInput.data.custom_id);
    const reward = interaction.fields.getTextInputValue(rewardInput.data.custom_id);

    await manualQuestService.updateManualQuest(questId, {
      name,
      description,
      reward
    });

    await interaction.editReply('Manual Quest Edited');
  },
};
