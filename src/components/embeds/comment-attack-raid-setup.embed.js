const { channelMention } = require("discord.js");
const footerEmbed = require("./footer.embed");

module.exports = (channelId) => {
  return {
    color: 0x1547d1,
    title: 'Comment Attack Raid Setup',
    description: `Automated Comment Attack Raid will be posted in ${channelMention(channelId)} Use the *Comment Attack Settings* button below to config the raid.`,
    footer: footerEmbed
  };
}
