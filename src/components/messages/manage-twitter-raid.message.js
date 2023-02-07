const { ActionRowBuilder } = require('discord.js');
const deleteTwitterRaidButton = require('../buttons/delete-twitter-raid.button');
const editTwitterRaidButton = require('../buttons/edit-twitter-raid.button');
const twitterRaidEmbed = require('../embeds/twitter-raid.embed');

module.exports = (id, tweetUrl, requiredCommentText, reward) => {
  return {
    embeds: [
      twitterRaidEmbed(tweetUrl, requiredCommentText, reward),
    ],
    components: [
      new ActionRowBuilder().setComponents(
        editTwitterRaidButton.render(id),
        deleteTwitterRaidButton.render(id)
      ),
    ],
  };
};
