const messages = require("../startup/messages");

module.exports = (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  messages(client);
}