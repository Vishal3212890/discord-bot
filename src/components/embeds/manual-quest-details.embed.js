const { inlineCode, bold } = require("discord.js")

module.exports = (name, description, reward) =>{
  return {
    color: 0x1547d1,
    title: `Quest Details | ${name}`,
    description: `
${bold('Description')}: ${description}

${bold('Reward')}: ${reward}

Attach Screenshot evidence with the command ${inlineCode(`/submit-quest ${name}`)} to submit the quest for verification`
  }
}