const { userMention, bold, roleMention } = require("discord.js");

module.exports = (userDiscordId, storeItem) => {
  const { name, description, price, stock, roleId } = storeItem;

  return {
    color: 0x1547d1,
    title: 'Store Item Application',
    description: `${userMention(userDiscordId)} bought the following Store Item
    
${bold('Name')}: ${name}
${bold('Description')}: ${description ?? 'description not set for this item'}
    
${bold('Price')}: ${price}
${bold('Stock')}: ${stock ?? 'Infinity'}
${bold('Role Assigned')}: ${roleMention(roleId)}`,
    timestamp: new Date()
  };
};