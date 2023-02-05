const fs = require("node:fs");
const path = require("node:path");
const { Collection } = require("discord.js");

class ComponentHandler {
  constructor(client, baseDir = path.join(__dirname, "..", "components")) {
    this.client = client;
    this.baseDir = baseDir;
  }

  addButtons(dir = "buttons") {
    this.client.buttons = new Collection();

    const buttonsPath = path.join(path.join(this.baseDir), dir);
    const buttonFiles = fs
      .readdirSync(buttonsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of buttonFiles) {
      const filePath = path.join(buttonsPath, file);
      const button = require(filePath);
      // Set a new item in the Collection with the key as the button name and the value as the exported module
      if ('data' in button && 'execute' in button) {
        const customId = button.data.data.custom_id;
        if (this.client.buttons.has(customId)) {
          console.log(`[WARNING] A button already exists with custom Id ${customId}`);
        } else {
          this.client.buttons.set(button.data.data.custom_id, button);
        }
      } else {
        console.log(
          `[WARNING] The button at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  addCommands(dir = "commands") {
    this.client.commands = new Collection();

    const commandsPath = path.join(path.join(this.baseDir), dir);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ("data" in command && "execute" in command) {
        this.client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  addModals(dir = "modals") {
    this.client.modals = new Collection();

    const modalsPath = path.join(path.join(this.baseDir), dir);
    const modalFiles = fs
      .readdirSync(modalsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of modalFiles) {
      const filePath = path.join(modalsPath, file);
      const modal = require(filePath);
      // Set a new item in the Collection with the key as the modal name and the value as the exported module
      if ("data" in modal && "execute" in modal) {
        this.client.modals.set(modal.data.data.custom_id, modal);
      } else {
        console.log(
          `[WARNING] The modal at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  addSelectMenus(dir = "selectMenus") {
    this.client.selectMenus = new Collection();

    const selectMenusPath = path.join(path.join(this.baseDir), dir);
    const selectMenuFiles = fs
      .readdirSync(selectMenusPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of selectMenuFiles) {
      const filePath = path.join(selectMenusPath, file);
      const selectMenu = require(filePath);
      // Set a new item in the Collection with the key as the selectMenu name and the value as the exported module
      if ("data" in selectMenu && "execute" in selectMenu) {
        this.client.selectMenus.set(selectMenu.data.data.custom_id, selectMenu);
      } else {
        console.log(
          `[WARNING] The selectMenu at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
}

module.exports = ComponentHandler;
