const { bold } = require("discord.js");
const footerEmbed = require("./footer.embed");

module.exports = {
  color: 0x1547d1,
  title: ':moneybag:The Bank:moneybag:',
  description: `A system to incentivize holders or members with special roles.
      
1. ${bold('Check Claim Rates')} button is used to check the latest claim rates.
2. ${bold('Check Balance')} button is used view your current balance (claimed/unclaimed)
3. ${bold('Claim')} button is used to claim any unclaimed balance. The claimed value will be based on the Claim Rates defined.`,
  footer: footerEmbed
};
