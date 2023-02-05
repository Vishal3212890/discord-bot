const { bold } = require('discord.js');

module.exports = (name, description, reward) => {
  return {
    color: 0x1547d1,
    title: `Quest Details | ${name}`,
    description: `
${bold('Description')}: ${description}

${bold('Reward')}: ${reward}

Click the ${bold('Claim Reward')} button below to claim your reward`,
  };
};
