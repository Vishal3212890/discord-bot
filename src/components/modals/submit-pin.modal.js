const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');
const twitterService = require('../../services/twitter.service');

const pinInput = new TextInputBuilder()
  .setCustomId('pin-input')
  .setLabel('Enter the pin below')
  .setStyle(TextInputStyle.Short);

const actionsRows = [pinInput].map((c) =>
  new ActionRowBuilder().addComponents(c)
);

module.exports = {
  data: new ModalBuilder()
    .setCustomId('submit-pin')
    .setTitle('Submit PIN')
    .addComponents(...actionsRows),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const pin = interaction.fields
      .getTextInputValue(pinInput.data.custom_id)
      .trim();

    const discordId = interaction.user.id;

    try {
      await twitterService.submitPin(discordId, pin);
    } catch (error) {
      return await interaction.editReply('Invalid PIN');
    }

    await interaction.editReply('Your Twitter Account Successfully Verified!');
  },
};
