const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');
const twitterService = require('../../services/twitter.service');
const userService = require('../../services/user.service');

const twitterUsernameSetupModal = new ModalBuilder()
  .setCustomId('twitter-username-setup-modal')
  .setTitle('Twitter Username Setup');

const twitterUsernameInput = new TextInputBuilder()
  .setCustomId('twitter-username-input')
  .setLabel('Your Twitter Username')
  .setStyle(TextInputStyle.Short);

const actionsRows = [twitterUsernameInput].map((c) =>
  new ActionRowBuilder().addComponents(c)
);

module.exports = {
  data: twitterUsernameSetupModal.addComponents(...actionsRows),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

	  const twitterUsername = interaction.fields
      .getTextInputValue(twitterUsernameInput.data.custom_id)
      .trim()
      .replace('@', '');

    const discordId = interaction.user.id;

    try {
      const twitterId = await twitterService.getTwitterIdByUsername(twitterUsername);
      await userService.updateUserByDiscordId(discordId, {twitterId});
    } catch (error) {
      return await interaction.editReply('Error: Invalid Username');
    }

    await interaction.editReply('Your Twitter Username has been Configured!');
  },
};
