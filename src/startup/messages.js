const theBankMessage = require('../components/messages/the-bank.message');
const manualQuestAdminPanelMessage = require('../components/messages/manual-quest-admin-panel.message');
const theQuestRoomMessage = require('../components/messages/the-quest-room.message');

const {
  DISCORD_THE_BANK_CHANNEL_ID,
  DISCORD_QUEST_PANNEL_CHANNEL_ID,
  DISCORD_QUEST_ROOM_CHANNEL_ID,
} = process.env;

module.exports = async function (client) {
  const map = {
    [DISCORD_THE_BANK_CHANNEL_ID]: theBankMessage,
    [DISCORD_QUEST_PANNEL_CHANNEL_ID]: manualQuestAdminPanelMessage,
    [DISCORD_QUEST_ROOM_CHANNEL_ID]: theQuestRoomMessage,
  };

  Object.entries(map).forEach(async (entry) => {
    const [channelId, message] = entry;
    const channel = client.channels.cache.get(channelId);
    const messages = await channel.messages.fetch();
    if (messages.size === 0) channel.send(message);
  });
};
