module.exports = async (interaction) => {
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
    await button.execute(interaction);
  }

  if (interaction.isModalSubmit()) {
    const modal = interaction.client.modals.get(interaction.customId);

    if (!modal) {
      console.error(
        `No modal matching ${interaction.customId} was found.`
      );
      return;
    }

    try {
      await modal.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
};
