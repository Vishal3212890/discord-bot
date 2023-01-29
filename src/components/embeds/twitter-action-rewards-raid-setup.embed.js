const footerEmbed = require('./footer.embed');

module.exports = (channel) => {
  return {
    color: 0x1547d1,
    title: 'Twitter Action Rewards Raid Setup',
    description: `Automated Action Rewards Raid will be posted in <#${channel}> 
    Use the *Action Rewards Attack Settings* button below to config the raid.`,
    footer: footerEmbed
  };
}
