const footerEmbed = require("./footer.embed");

module.exports = (data) => {
  return {
    color: 0x1547d1,
    title: "**Automated Comments Rewards**",
    description:
      `Reply this following tweet with the required comment text below to claim your 
        reward.
      
        :link:**Tweet to Raid.**:link:
        ${data.tweetUrl}
      
        **Required Comment Test**
        ` +
      "```" +
      data.commentTest +
      "```" +
      `
      
        **Reward**
        ${data.reward}`,
    footer: footerEmbed,
  };
};
