const { bold } = require("discord.js");
const footerEmbed = require("./footer.embed");

module.exports = {
  color: 0x1547d1,
  title: 'The Store',
  description: `Looking to buy something with all these ${bold('Tokens')} you're earning?

  This is the place to shop around at. Click on the ${bold('View Store Items')} button below to display a dropdown for all store items. You could then select an item to view it's details and buy it.`,
  footer: footerEmbed
};
