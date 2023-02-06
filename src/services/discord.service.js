exports.countMessages = async (interaction) => {
  const guildId = interaction.message.guildId;
  const discordId = interaction.user.id;
  const guild = interaction.client.guilds.cache.get(guildId);
  const channels = guild.channels.cache;
  const channelsWithMessages = channels.filter((ch) => ch.messages);
  const messagesInChannels = await Promise.all(
    channelsWithMessages.map((ch) => ch.messages.fetch())
  );

  const set = new Set();

  const matches = (message) =>
    message.content &&
    message.author.id == discordId &&
    message.content.split(' ').length > 1;

  messagesInChannels.forEach((messages) => {
    messages.forEach((message) => {
      if (matches(message)) {
        set.add(message.content);
      }
    });
  });

  return set.size;
};

exports.countInvites = async (interaction) => {
  const guildId = interaction.message.guildId;
  const discordId = interaction.user.id;
  const guild = interaction.client.guilds.cache.get(guildId);
  const invites = await guild.invites.fetch();
  return invites.reduce(
    (count, invite) => (invite.inviterId == discordId ? count + 1 : count),
    0
  );
};

exports.addPointToReactions = async (userId) => {
  const channel = this.client.channels.cache.get('1071333524273111083');
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
  console.log('WORKING');
};
