const userService = require('../services/user.service');

module.exports = async (interaction) => {
  const discordId = interaction.user.id;
  const user = await userService.getUserByDiscordId(discordId);
  if (!user) await userService.createUser({ discordId });

  const getComponent = (interaction, components) => {
    const customId = Array.from(components.keys()).find(k => new RegExp(k).test(interaction.customId));
    return components.get(customId);
  }

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
    const button = getComponent(interaction, interaction.client.buttons);

    if (!button) {
      console.error(`No modal matching ${interaction.customId} was found.`);
      return;
    }

    try {
      await button.execute(interaction);
    } catch (error) {
      console.error(error);
      const msg = 'Some error occurred!';
      interaction.deferred
        ? await interaction.editReply(msg)
        : await interaction.reply(msg, { ephemeral: true });
    }
  }

  if (interaction.isModalSubmit()) {
    const { modals } = interaction.client;
    const customId = Array.from(modals.keys()).find(k => new RegExp(k).test(interaction.customId));
    
    const modal = modals.get(customId);

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

  if (interaction.isStringSelectMenu()) {
    const selectMenu = interaction.client.selectMenus.get(interaction.customId);

    try {
      await selectMenu.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: 'There was an error processing the interaction!',
      });
    }
  }
};
