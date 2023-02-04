const manualQuestAdminPanelMessage = require('../messages/manual-quest-admin-panel.message');
const theBankMessage = require('../messages/the-bank.message');

const { DISCORD_THE_BANK_CHANNEL_ID, DISCORD_QUEST_CHANNEL_ID } = process.env;

module.exports = async function (client) {
  const map = {
    [DISCORD_THE_BANK_CHANNEL_ID]: theBankMessage,
    [DISCORD_QUEST_CHANNEL_ID]: manualQuestAdminPanelMessage
  }

  Object.entries(map).forEach(async (entry) => {
    const [channelId, message] = entry;
    const channel = client.channels.cache.get(channelId);
    const messages = await channel.messages.fetch();
    if (messages.size === 0) channel.send(message);
  });
};
