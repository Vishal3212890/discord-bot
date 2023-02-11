const { userMention, inlineCode } = require("discord.js");
const logMessage = require("../messages/log.message");

const { DISCORD_LOGS_CHANNEL_ID } = process.env;

module.exports = {
  getLogChannel(client) {
    return client.channels.cache.get(DISCORD_LOGS_CHANNEL_ID);
  },

  async logStoreApplicationAcceptedLog(client, user, storeItem) {
    const logChannel = this.getLogChannel(client);
    const logText = `:white_check_mark: Store item buy request sent by ${userMention(user.discordId)} for item ${inlineCode(storeItem.name)} has been Accepted`;
    await logChannel.send(logMessage(logText));
  },

  async logStoreApplicationRejectedLog(client, user, storeItem) {
    const logChannel = this.getLogChannel(client);
    const logText = `:x: Store item buy request sent by ${userMention(user.discordId)} for item ${inlineCode(storeItem.name)} has been Rejected`;
    await logChannel.send(logMessage(logText));
  },

  async logQuestApplicationAcceptedLog(client, user, quest) {
    const logChannel = this.getLogChannel(client);
    const logText = `:white_check_mark:`;
    await logChannel.send(logMessage(logText));
  },

  async logQuestApplicationRejectedLog(client, user, quest) {
    const logChannel = this.getLogChannel(client);
    const logText = `:x:`;
    await logChannel.send(logMessage(logText));
  }
}