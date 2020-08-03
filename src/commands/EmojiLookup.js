/**
 * class used to lookup emojis from servers
 */
const EmojiLookup = (client) => {
  const emojiLookup = {};
  emojiLookup.client = client;
  emojiLookup.emojis = [];

  /**
   * init the emojilookup class
   */
  emojiLookup.init = () => {
    this.client.guilds.cache.forEach((guild) => {
      guild.emojis.cache.forEach((emoji) => {
        emojiLookup.emojis.push(emoji);
      });
    });
  };

  /**
   * Get emoji from array
   *
   * @param {*} emojiName name of the emoji
   */
  emojiLookup.get = (emojiName) => {
    return this.emojis.find((emoji) => emoji.name === emojiName);
  };

  // return lookup object
  emojiLookup.init();
  return emojiLookup;
};

// export object to make accessible via other files
module.exports = EmojiLookup;
