const theBankMessage = require('../components/messages/the-bank.message');
const theQuestRoomMessage = require('../components/messages/the-quest-room.message');
const questAdminPanelMessage = require('../components/messages/quest-admin-panel.message');
const theStoreMessage = require('../components/messages/the-store.message');
const storeAdminPanelMessage = require('../components/messages/store-admin-panel.message');
const nftVerificationMessage = require('../components/messages/nft-verification.message');

const {
  DISCORD_THE_BANK_CHANNEL_ID,
  DISCORD_QUEST_PANNEL_CHANNEL_ID,
  DISCORD_QUEST_ROOM_CHANNEL_ID,
  DISCORD_STORE_CHANNEL_ID,
  DISCORD_STORE_PANNEL_ID,
  DISCORD_NFT_VERIFICATION_CHANNEL_ID,
} = process.env;

module.exports = async (client) => {
  const map = {
    [DISCORD_THE_BANK_CHANNEL_ID]: theBankMessage,
    [DISCORD_QUEST_ROOM_CHANNEL_ID]: theQuestRoomMessage,
    [DISCORD_QUEST_PANNEL_CHANNEL_ID]: questAdminPanelMessage,
    [DISCORD_STORE_CHANNEL_ID]: theStoreMessage,
    [DISCORD_STORE_PANNEL_ID]: storeAdminPanelMessage,
    [DISCORD_NFT_VERIFICATION_CHANNEL_ID]: nftVerificationMessage,
  };

  Object.entries(map).forEach(async (entry) => {
    const [channelId, message] = entry;
    const channel = client.channels.cache.get(channelId);
    const messages = await channel.messages.fetch();
    if (messages.size === 0) channel.send(message);
  });
};
