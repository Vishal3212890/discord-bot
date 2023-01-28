const footerEmbed = require('./footer.embed');

module.exports = (channel) => {
  return {
    color: 0x1547d1,
    title: 'Comment Attack Raid Setup',
    description: `Automated Comment Attack Raid will be posted in <#${channel}> 
    Use the *Comment Attack Settings* button below to config the raid.`,
    footer: footerEmbed
  };
}
