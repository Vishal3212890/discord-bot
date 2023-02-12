const { roleMention, inlineCode, bold } = require('discord.js');
const footerEmbed = require('./footer.embed');

module.exports = (claimRates) => {
  return {
    color: 0x1547d1,
    title: 'Current Claim Rates',
    description: `
${claimRates
  .map(
    ({ roleId, rate }) => `${roleMention(roleId)} - ${inlineCode(rate + '%')}`
  )
  .join('\n')}
  
${bold('Terms and Conditions')}
When claiming an unclaimed balance, members with any of the above roles will be able to claim the amount equal to the ${inlineCode('%')} assigned to it. For example, if the claim rate for your role is set to ${inlineCode('120%')}, you'll be able to claim ${inlineCode('120%')} of your unclaimed balance.

If you have multiple roles, claim rates won't stack. Only the highest one is counted!`,
    footer: footerEmbed
  };
};
