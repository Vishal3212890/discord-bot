const { ButtonBuilder, ButtonStyle } = require('discord.js');
const discordService = require('../../services/discord.service');
const questService = require('../../services/quest.service');
const userService = require('../../services/user.service');

const customIdPrefix = 'claim-quest-reward-';

module.exports = {
  data: new ButtonBuilder()
    .setCustomId(customIdPrefix + '*')
    .setLabel('Claim Quest Reward')
    .setStyle(ButtonStyle.Primary),

  render(id) {
    return this.data.setCustomId(customIdPrefix + id.toString());
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    // Get quest
    const questId = interaction.customId.substring(customIdPrefix.length);
    const quest = await questService.getQuestById(questId);
    if (!quest) {
      await interaction.editReply('Quest Not Found');
      return;
    }

    // Get user
    const discordId = interaction.user.id;
    const user = await userService.getUserByDiscordId(discordId);

    const rewardClaimed = await questService.questRewardClaimed(user._id, quest._id);
    if (rewardClaimed) return await interaction.editReply('Quest Reward Already Claimed');

    switch (quest.type) {
      case 'reach_n_messages':
        const messageCount = await discordService.countMessages(interaction);
        console.log(messageCount);
        if (messageCount < quest.numberOfMessages) {
          await interaction.editReply('Not Enough Messages');
          return;
        }
        break;
      case 'invite_n_people':
        const inviteCount = await discordService.countInvites(interaction);
        if (inviteCount < quest.numberOfInvites) {
          await interaction.editReply('Not Enough Invites');
          return;
        }
        break;
      case 'add_reactions_in_announcement':
        const addedReactionsInAnnouncement = await discordService.addedReactionsInAnnouncement(interaction);
        if (!addedReactionsInAnnouncement) {
          await interaction.editReply('Not Enough Reactions');
          return;
        }
        break;
      case 'boost_the_server':
        const boostedServer = await discordService.boostedServer(interaction);
        if (!boostedServer) {
          await interaction.editReply('Server Not Boosted');
          return;
        }
        break;
      default:
        await interaction.editReply('Quest Type Not Supported');
        return;
    }

    // Claim reward
    await questService.claimQuestReward(user._id, quest._id);

    await interaction.editReply('Quest Reward Claimed');
  },
};
