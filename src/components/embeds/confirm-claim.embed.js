const { bold, inlineCode } = require("discord.js");
const footerEmbed = require('./footer.embed');

module.exports = (claimRate) => {
  return {
    color: 0x1547d1,
    description: `Based on your current claim rates, your are eligible to claim ${inlineCode(claimRate + '%')} of your unclaimed balance. Click on the ${bold('Claim')} button to claim your balance.`,
    footer: footerEmbed
  };
};