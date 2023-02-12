const { bold, inlineCode } = require("discord.js");
const footerEmbed = require("./footer.embed");

module.exports = {
  color: 0x1547d1,
  title: 'The Quest Room',
  description: `This is the place to check out currently active quests. Click on the View Quests button below to display a dropdown for all active quests you can complete.

${bold('Submit Quests')}
Submit a quest completion proof using the following command in the channel ${bold('#submit-quests')} ${inlineCode('/submit-quest [Quest Name]')} (attach an image proof when using this command)`,
  footer: footerEmbed
};
