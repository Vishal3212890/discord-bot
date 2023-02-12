const { bold } = require('discord.js');
const footerEmbed = require('./footer.embed');

module.exports = {
  color: 0x1547d1,
  title: 'NFT Verification',
  url: 'https://xpunks.club',
  description: `${bold('Verify your assets')}
  
◆ If you want to gain access to the rest of the server and join us in the Punkhouse, verify your XPUNKS and/or UNIXPUNKS NFTs holdings by completing the verification process with the XUMM app.

◆ This is a read-only connection. Do not share your private keys. We will never ask for your seed phrase. We will never DM you.`,
  thumbnail: {
    url: 'https://onxrp.com/wp-content/uploads/2022/11/Twitter-Bot.png',
  },
  image: {
    url: 'https://xpunks.club/wp-content/uploads/2022/11/Banner-2048x403.png',
  },
  footer: footerEmbed
};
