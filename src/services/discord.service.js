class DiscordService {
  constructor(client) {
    this.client = client;
  }

  async countMessages(guildId, userId) {
    const guild = this.client.guilds.cache.get(guildId);
    const channels = guild.channels.cache;
    const channelsWithMsgs = channels.filter((ch) => ch.messages);
    const msgsInEachChannel = await Promise.all(
      channelsWithMsgs.map((ch) => ch.messages.fetch())
    );

    let count = 0;

    msgsInEachChannel.forEach((msgs) =>
      msgs.forEach((msg) => {
        if (msg.author.id == userId) count++;
      })
    );

    return count;
  }
}

module.exports = DiscordService;
