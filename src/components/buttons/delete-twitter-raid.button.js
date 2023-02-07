const { ButtonBuilder, ButtonStyle } = require('discord.js');
const twitterRaidService = require('../../services/twitterRaid.service');

const customIdPrefix = 'delete-twitter-raid-';

module.exports = {
  data: new ButtonBuilder()
    .setCustomId(customIdPrefix + '*')
    .setLabel('Delete Raid')
    .setStyle(ButtonStyle.Danger),

  render(id) {
    return this.data.setCustomId(customIdPrefix + id.toString());
  },

  getId(interaction) {
    return interaction.customId.substring(customIdPrefix.length);
  },

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const twitterRaidId = this.getId(interaction);
    const twitterRaid = await twitterRaidService.getRaidById(
      twitterRaidId
    );

    const { channelId, discordMessageId } = twitterRaid;

    const channel = interaction.client.channels.cache.get(channelId);
    const messages = await channel.messages.fetch();
    const message = messages.get(discordMessageId);

    if (message) await message.delete();
    await interaction.message.delete();

    await interaction.editReply('Raid Deleted');
  },
};
