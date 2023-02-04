const userService = require('../services/user.service');

module.exports = async (interaction) => {
  const discordId = interaction.user.id;
  const user = await userService.getUserByDiscordId(discordId);
  if (!user) await userService.createUser({ discordId });

  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }

  if (interaction.isButton()) {
    const button = interaction.client.buttons.get(interaction.customId);

    if (!button) {
      console.error(`No modal matching ${interaction.customId} was found.`);
      return;
    }

    try {
      await button.execute(interaction);
    } catch (error) {
      console.log(error)
      console.error(error);
      await interaction.reply({
        content: 'Some error occurred!',
        ephemeral: true,
      });
    }
  }

  if (interaction.isModalSubmit()) {
    const modal = interaction.client.modals.get(interaction.customId);

    if (!modal) {
      console.error(`No modal matching ${interaction.customId} was found.`);
      return;
    }

    try {
      await modal.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while submitting this form!',
        ephemeral: true,
      });
    }
  }
};
