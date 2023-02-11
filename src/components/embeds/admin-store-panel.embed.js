const { bold } = require("discord.js");

module.exports = {
  color: 0x1547d1,
  title: "Store Admin Panel",
  description: `Details of a Store Item:
  
  1. \`Name*\`: Name of the Item.
  2. \`Price*\`: Price of the Item.
  3. \`Description\`: Description of the Item (optional).
  4. \`Role*\`: Role that will be assigned.
  5. \`stock\`: Stock of the Item. (default infinite)

  
  Create Item Command:
   ${bold("/add-store-item <name> <role> <price>")}: Add a New Store Item.

  Edit a Existing Store Item
   ${bold(`/edit-store-item name <item> <newName>`)} Edit Store Item Name.
   ${bold(`/edit-store-item price <item> <newPrice>`)} Edit Store Item Price.
   ${bold(`/edit-store-item role <item> <newRole>`)} Edit Store Item Role.
   ${bold(
     `/edit-store-item stock <item> <newStock>`
   )} Edit Store Item Stock (default value will be infiinty if no stock is given).
   ${bold(
     `/edit-store-item description <item> <newDescription>`
   )} Edit Store Item Name.

   Delete a Store Item
   ${bold(`/delete-store-item <name>`)} Delete a Store Item.
`,
};
