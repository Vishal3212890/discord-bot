require('./startup/env');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { DISCORD_BOT_TOKEN: token } = process.env;
const registerButtons = require('./utils/registerButtons');
const registerCommands = require('./utils/registerCommands');

const messages = require('./startup/messages');
require("./startup/uncaughtException")();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

registerButtons(client);
registerCommands(client);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
  messages(c);
});

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }

  if (interaction.isButton()) {
    const button = interaction.client.buttons.get(interaction.customId);
    await button.execute(interaction);
  }
});

client.login(token);
