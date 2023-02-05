const theBankMessage = require('../components/messages/the-bank.message');
const theQuestRoomMessage = require('../components/messages/the-quest-room.message');
const questAdminPanelMessage = require('../components/messages/quest-admin-panel.message');

const {
  DISCORD_THE_BANK_CHANNEL_ID,
  DISCORD_QUEST_PANNEL_CHANNEL_ID,
  DISCORD_QUEST_ROOM_CHANNEL_ID,
} = process.env;

module.exports = async function (client) {
  const map = {
    [DISCORD_THE_BANK_CHANNEL_ID]: theBankMessage,
    [DISCORD_QUEST_ROOM_CHANNEL_ID]: theQuestRoomMessage,
    [DISCORD_QUEST_PANNEL_CHANNEL_ID]: questAdminPanelMessage,
  };

  Object.entries(map).forEach(async (entry) => {
    const [channelId, message] = entry;
    const channel = client.channels.cache.get(channelId);
    const messages = await channel.messages.fetch();
    if (messages.size === 0) channel.send(message);
  });
};
