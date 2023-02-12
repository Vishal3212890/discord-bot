const UserReaction = require("../models/UserReaction");
const userService = require('./user.service');
const questService = require('./quest.service');

const { DISCORD_ANNOUNCEMENTS_CHANNEL_ID } = process.env;

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

exports.claimAddReactionsInAnnouncementReward = async (interaction, user, quest) => {
  const discordId = interaction.user.id;

  const channels = interaction.client.channels.cache;
  const channel = channels.get(DISCORD_ANNOUNCEMENTS_CHANNEL_ID);
  const messages = await channel.messages.fetch();

  const lastFiveMessages = Array.from(messages.values()).slice(0, 5);

  let claimedAnyReward = false;
  let reactionCount = 0;

  for (const message of lastFiveMessages) {
    const reactionExists = await UserReaction.exists({
      discordMessageId: message.id,
      user: user._id,
      quest: quest._id,
    });
    if (reactionExists) {
      reactionCount++;
      continue;
    };

    let reacted = false;
    const reactions = message.reactions.cache.values();
    for (const reaction of reactions) {
      const users = await reaction.users.fetch();
      if (users.has(discordId)) {
        reacted = true;
        break;
      }
    }

    if (reacted) {
      await UserReaction.create({
        discordMessageId: message.id,
        user: user._id,
        quest: quest._id,
      });
      await userService.increaseUnclaimedBalance(user._id, quest.reward);
      claimedAnyReward = true;
      reactionCount++
    }
  }

  if (reactionCount === 5) {
    await questService.markQuestClaimed(user._id, quest._id);
  }
  
  return claimedAnyReward;
};

exports.boostedServer = async (interaction) => {
  return interaction.member.roles.cache.find(
    (role) => role.name === 'Server Booster'
  );
};
