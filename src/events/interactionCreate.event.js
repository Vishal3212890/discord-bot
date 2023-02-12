const userService = require('../services/user.service');

module.exports = async (interaction) => {
  const discordId = interaction.user.id;
  const user = await userService.getUserByDiscordId(discordId);
  if (!user) await userService.createUser({ discordId });

  const getComponent = (components) => {
    const customId = Array.from(components.keys()).find((k) =>
      new RegExp('^' + k).test(interaction.customId)
    );
    return components.get(customId);
  };

  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }
    await command.execute(interaction);
  }

  if (interaction.isButton()) {
    const button = getComponent(interaction.client.buttons);
    if (!button) {
      console.error(`No button matching ${interaction.customId} was found.`);
      return;
    }
    await button.execute(interaction);
  }

  if (interaction.isModalSubmit()) {
    const modal = getComponent(interaction.client.modals);
    if (!modal) {
      console.error(`No modal matching ${interaction.customId} was found.`);
      return;
    }
    await modal.execute(interaction);
  }

  if (interaction.isStringSelectMenu()) {
    const selectMenu = interaction.client.selectMenus.get(interaction.customId);
    if (!selectMenu) {
      console.error(`No select menu matching ${interaction.customId} was found.`);
      return;
    }
    await selectMenu.execute(interaction);
  }
};
