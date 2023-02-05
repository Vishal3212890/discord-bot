const { userMention, inlineCode } = require("discord.js");

module.exports = (userDiscordId, questName, imageUrl) => {
  return {
    color: 0x1547d1,
    title: 'Quest Submission Application',
    description: `${userMention(userDiscordId)} has submitted the quest ${inlineCode(questName)} Below is the attached screenshot evidence`,
    image: {
      url: imageUrl
    },
    timestamp: new Date()
  };
};