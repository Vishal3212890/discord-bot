const footerEmbed = require('./footer.embed');

module.exports = (authUrl, qrImageUrl) => {
  return {
    color: 0x1547d1,
    title: 'AUTH LINK - Click here for mobile',
    url: authUrl,
    description: `
◆ Scan this QR code with your XUMM wallet to verify that you hold XPUNKS and/or UNIXPUNKS NFTs. This is a read-only transaction.
  
◆ The last wallet that you sign with, is used to determine if you are eligible to enter the Punkhouse!`,
    image: {
      url: qrImageUrl,
    },
    footer: footerEmbed,
  };
};
