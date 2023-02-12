const { bold, inlineCode } = require("discord.js");

module.exports = {
  color: 0x1547d1,
  title: "Store Admin Panel",
  description: `
Details of a Store Item:
1. ${bold('Name*')}: Name of the Item.
2. ${bold('Price*')}: Price of the Item.
3. ${bold('Role*')}: Role that will be assigned.
4. ${bold('Description')}: Description of the Item.
5. ${bold('Stock')}: Stock of the Item. (default Infinite)

${bold('Create Store Item')}:
  ${inlineCode('/add-store-item <name> <role> <price>')}  Add a New Store Item.

${bold('Edit Store Item')}:
  ${inlineCode('/edit-store-item name <item> <newName>')}  Edit Store Item Name.
  ${inlineCode('/edit-store-item description <item> <description>')}  Edit Store Item Description.
  ${inlineCode('/edit-store-item price <item> <price>')}  Edit Store Item Price.
  ${inlineCode('/edit-store-item role <item> <role>')}  Edit Store Item Role.
  ${inlineCode('/edit-store-item stock <item> <stock>')}  Edit Store Item Stock, default value will be set Infinite if no stock is given.

${bold('Delete Store Item')}:
  ${inlineCode('/delete-store-item <name>')} Delete a Store Item.`,
};
