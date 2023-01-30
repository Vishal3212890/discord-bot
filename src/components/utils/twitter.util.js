const twitterUsernameSetupModal = require('../modals/twitter-username-setup.modal');

exports.handleTwitterAuth = async (interaction) => {
  await interaction.showModal(twitterUsernameSetupModal.data);
}