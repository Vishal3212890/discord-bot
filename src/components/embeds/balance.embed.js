const footerEmbed = require("./footer.embed");

module.exports = (claimedBalance, unclaimedBalance) => {
  return {
    color: 0x1547d1,
    title: ':money_mouth: Balance :money_mouth:',
    description: `Your Claimed Balance is ${claimedBalance} CUS

    Unclaimed Balance: ${unclaimedBalance} CUS`,
    footer: footerEmbed,
  };
}