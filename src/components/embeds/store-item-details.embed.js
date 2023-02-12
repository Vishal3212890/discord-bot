const { bold, roleMention } = require('discord.js');
const footerEmbed = require('./footer.embed');

module.exports = (storeItem) => {
  const { name, description, price, stock, roleId } = storeItem;
  
  return {
    color: 0x1547d1,
    title: `:shopping_bags: Store Item Details`,
    description: `
${bold('Name')}: ${name}
${bold('Description')}: ${description ?? 'description not set for this item'}
    
${bold('Price')}: ${price}
${bold('Stock')}: ${stock ?? 'Infinity'}
${bold('Role Assigned')}: ${roleMention(roleId)}`,
    footer: footerEmbed
  };
};
