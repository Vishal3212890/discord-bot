const { inlineCode, bold } = require("discord.js");

module.exports = {
  color: 0x1547d1,
  title: 'Quest Admin Panel',
  description: `Details of a Quest:

1. ${inlineCode('Name*')}: Name of the Quest.
2. ${inlineCode('Description*')}: Description of the Quest.
3. ${inlineCode('Reward*')}: Reward of the Quest must be a positive integer.
4. ${inlineCode('Number of Messages')}: Required when creating 'Reach n Messages' Quest.
4. ${inlineCode('Number of Invites')}: Required when creating 'Invite n People' Quest.

Available Operations:
1. ${bold('Add Quest')} button is used to add a new quest.
2. ${bold('Edit Quest')} button is used to edit a existing quest.
3. ${bold('Delete Quest')} button is used to delete a quest.`,
};
