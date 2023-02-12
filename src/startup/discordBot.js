const { Client, Events, GatewayIntentBits } = require('discord.js');
const ComponentHandler = require('../utils/ComponentHandler');
const clientReadyEvent = require('../events/clientReady.event');
const interactionCreateEvent = require('../events/interactionCreate.event');

const { DISCORD_BOT_TOKEN: token } = process.env;

module.exports = async () => {
  // Create a new client instance
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  
  // Add Components
  const componentHandler = new ComponentHandler(client);
  componentHandler.addButtons();
  componentHandler.addCommands();
  componentHandler.addModals();
  componentHandler.addSelectMenus();
  
  // Register Events
  client.once(Events.ClientReady, clientReadyEvent);
  client.on(Events.InteractionCreate, interactionCreateEvent);
  
  await client.login(token);
}
