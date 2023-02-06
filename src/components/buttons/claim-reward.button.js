const { ButtonBuilder, ButtonStyle } = require('discord.js');
const discordService = require('../../services/discord.service');
const questService = require('../../services/quest.service');
const userService = require('../../services/user.service');

const customIdPrefix = 'claim-reward-';

module.exports = {
  data: new ButtonBuilder()
    .setCustomId(customIdPrefix + '*')
    .setLabel('Claim Reward')
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
        if (messageCount < quest.numberOfMessages)
          return await interaction.editReply('Not Enough Messages');
        await questService.claimQuestReward(user._id, quest._id);
        break;

      case 'invite_n_people':
        const inviteCount = await discordService.countInvites(interaction);
        if (inviteCount < quest.numberOfInvites) 
          return await interaction.editReply('Not Enough Invites');
        await questService.claimQuestReward(user._id, quest._id);
        break;

      case 'add_reactions_in_announcement':
        break;

      case 'boost_the_server':
        break;
        
      default:
        return await interaction.editReply('Quest Type Not Supported');
    }

    await interaction.editReply('Reward Claimed');
  },
};
