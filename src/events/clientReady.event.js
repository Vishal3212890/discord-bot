const sendMessages = require('../startup/sendMessages');

module.exports = (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  sendMessages(client);
};
