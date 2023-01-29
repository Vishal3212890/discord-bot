module.exports = {
  getMentionedChannelIds(str) {
    const matches = str.match(/<#.*?>/g);
    const ids = matches.map((m) => m.substring(2, m.length - 1));
    return ids;
  },
};
