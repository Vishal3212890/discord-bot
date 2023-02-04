const { hyperlink } = require("discord.js");

module.exports = (authUrl) => {
  return {
    color: 0x1547d1,
    title: 'Verify Twitter Account',
    description: `Follow the steps as shown below:

1. Go the the Twitter ${hyperlink('OAUTH AUTHORIZATION PAGE HERE', authUrl)} and authorize the app using your twitter account.

2. Copy the **PIN** provided and submit it via the **Submit PIN** button below.`
  };
}
