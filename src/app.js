require('./startup/env');
require("./startup/uncaughtException")();
const { Client, Events, GatewayIntentBits } = require('discord.js');
const ComponentHandler = require('./utils/ComponentHandler');
const readyHandler = require('./handlers/ready.handler');
const interactionCreateHandler = require('./handlers/interactionCreate.handler');

const { DISCORD_BOT_TOKEN: token } = process.env;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const componentHandler = new ComponentHandler(client);
componentHandler.addButtons();
componentHandler.addCommands();
componentHandler.addModals();

// Register Events
client.once(Events.ClientReady, readyHandler);
client.on(Events.InteractionCreate, interactionCreateHandler);

client.login(token);
