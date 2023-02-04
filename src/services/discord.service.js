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

  async countInvitations(guildId, userId) {
    const guild = this.client.guilds.cache.get(guildId);
    let count = 0;

    //guild.fetchInvites()
    const invites = await guild.invites.fetch();
    invites.forEach((invite) => {
      if (invite.inviterId == userId) count = count + 1;
    });

    // console.log(count);
    return count;
  }
  async addPointToReactions(userId) {
    const channel = this.client.channels.cache.get("1071333524273111083");
    const messages = await channel.messages.fetch();
    // console.log(messages);
    await messages.forEach(async (message) => {
      message.reactions.cache.forEach(async (reaction) => {
        const users = await reaction.users.fetch();
        users.forEach((usr) => {
          console.log(usr.id, userId);
          if (!(usr.id == userId)) {
            console.log(false);
            return false;
          } else {
            console.log(true);
          }
        });
      });
    });
    console.log("WORKING");
  }
}

module.exports = DiscordService;
