const { channelMention } = require('discord.js');

module.exports = (channelId) => {
  return {
    color: 0x1547d1,
    title: 'Twitter Action Rewards Raid Setup',
    description: `Automated Action Rewards Raid will be posted in ${channelMention(channelId)} Use the *Action Rewards Attack Settings* button below to config the raid.`
  };
}
