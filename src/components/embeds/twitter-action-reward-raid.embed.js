const footerEmbed = require('./footer.embed');

module.exports = (tweetUrl, requiredCommentText, commentReward) => {
  return {
    color: 0x1547d1,
    author: {
      name: 'Twitter Actions Rewards',
      iconURL:
        'https://images-ext-2.discordapp.net/external/vbrnPdtW9H59GgSBUPT-dm1_-tbMC-Kfg2-b1RYLxWk/%3Fraw%3Dtrue/https/github.com/vmpyre/BotsOnDisplay/blob/main/logos/twitter_logo-removebg-preview.png',
    },
    description: `1 - **LIKE**, **COMMENT** and **RETWEET** the tweet linked below.
2 - Click on the buttons below to claim your rewards.

**Tweet to Raid**
${tweetUrl}

**Required Comment Test**
\`\`\`${requiredCommentText}\`\`\`
**Reward**
${commentReward}`,
    footer: footerEmbed,
  };
};
