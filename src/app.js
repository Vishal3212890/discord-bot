require('./startup/env');
require('./startup/uncaughtException')();
const { Client, Events, GatewayIntentBits } = require('discord.js');
const ComponentHandler = require('./utils/ComponentHandler');
const clientReadyEvent = require('./events/clientReady.event');
const interactionCreateEvent = require('./events/interactionCreate.event');

const { DISCORD_BOT_TOKEN: token } = process.env;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Add Components
const componentHandler = new ComponentHandler(client);
componentHandler.addButtons();
componentHandler.addCommands();
componentHandler.addModals();

// Register Events
client.once(Events.ClientReady, clientReadyEvent);
client.on(Events.InteractionCreate, interactionCreateEvent);

client.login(token);
