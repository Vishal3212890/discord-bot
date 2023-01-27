const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require("discord.js");

module.exports = function (client) {
  client.buttons = new Collection();

  const buttonsPath = path.join(__dirname, '..', 'components', 'buttons');
  const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));
  
  for (const file of buttonFiles) {
    const filePath = path.join(buttonsPath, file);
    const button = require(filePath);
    // Set a new item in the Collection with the key as the button name and the value as the exported module
    if ('data' in button && 'execute' in button) {
      client.buttons.set(button.data.data.custom_id, button);
    } else {
      console.log(`[WARNING] The button at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}
