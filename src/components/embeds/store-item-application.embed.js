const { userMention, bold, roleMention, italic } = require('discord.js');
const footerEmbed = require('./footer.embed');

module.exports = (user, storeItem) => {
  const { discordId, walletAddress } = user;
  const { name, description, price, stock, roleId } = storeItem;

  return {
    color: 0x1547d1,
    title: 'Store Item Application',
    description: `${userMention(discordId)} bought the following Store Item
    
${bold('Name')}: ${name}
${bold('Description')}: ${description ?? 'description not set for this item'}
    
${bold('Price')}: ${price}
${bold('Stock')}: ${stock ?? 'Infinity'}
${bold('Role Assigned')}: ${roleMention(roleId)}

User wallet address: ${italic(String(walletAddress))}`,
    timestamp: new Date(),
    footer: footerEmbed
  };
};
