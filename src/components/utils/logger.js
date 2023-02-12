const { userMention, bold } = require("discord.js");
const logMessage = require("../messages/log.message");

const { DISCORD_LOGS_CHANNEL_ID } = process.env;

module.exports = {
  getLogChannel(client) {
    return client.channels.cache.get(DISCORD_LOGS_CHANNEL_ID);
  },

  async logStoreApplicationAcceptedLog(client, user, storeItem) {
    const logChannel = this.getLogChannel(client);
    const logText = `:white_check_mark: Store item buy request sent by ${userMention(user.discordId)} for item ${bold(storeItem.name)} has been Accepted`;
    await logChannel.send(logMessage(logText));
  },

  async logStoreApplicationRejectedLog(client, user, storeItem) {
    const logChannel = this.getLogChannel(client);
    const logText = `:x: Store item buy request sent by ${userMention(user.discordId)} for item ${bold(storeItem.name)} has been Rejected`;
    await logChannel.send(logMessage(logText));
  },

  async logQuestApplicationAcceptedLog(client, user, quest) {
    const logChannel = this.getLogChannel(client);
    const logText = `:white_check_mark: Quest application sent by ${userMention(user.discordId)} for Quest ${bold(quest.name)} has been Accepted`;
    await logChannel.send(logMessage(logText));
  },

  async logQuestApplicationRejectedLog(client, user, quest) {
    const logChannel = this.getLogChannel(client);
    const logText = `:x: Quest application sent by ${userMention(user.discordId)} for Quest ${bold(quest.name)} has been Rejected`;
    await logChannel.send(logMessage(logText));
  }
}