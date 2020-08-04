const axios = require('axios');
const Discord = require('discord.js');
const Command = require('../Command');

/**
 * Fetches an otter picture from r/otters
 */
class OtterPicCommand extends Command {
  constructor() {
    super(
      'otter',
      ['otterpic'],
      'Fetches random otterpic from r/otters.',
      `${process.env.PREFIX}otter`,
      true
    );
  }

  async execute(msg) {
    // check if command is enabled
    if (!this.enabled) {
      logger.error(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    try {
      // make api call
      const result = await axios.get(
        'https://www.reddit.com/r/Otters.json?limit=100'
      );
      const posts = result.data.data.children;

      // grab random post
      let randomPost = '';
      let attempts = 0;
      do {
        randomPost = posts[Math.floor(Math.random() * posts.length)].data.url;
        attempts += 1;
      } while (
        /* eslint-disable-next-line */
        !(/[\/.](gif|jpg|jpeg|png)$/i.test(randomPost) || attempts >= 100)
      );

      // image not found
      if (attempts >= 100) {
        msg.reply('Did 100 attempts, image not found...');
        return;
      }

      // image found
      const embed = new Discord.MessageEmbed()
        .setColor('#0088ff')
        .setTitle('Random Otter')
        .setImage(randomPost)
        .setTimestamp()
        .setFooter('Eerlijk gestolen van r/Otters');
      msg.channel.send(embed);
    } catch (ex) {
      throw new Error('Something went wrong when reaching Reddit');
    }

    // react with otter-handsup
    try {
      msg.react(emojiLookup.get('HANDSUP'));
    } catch (ex) {
      throw new Error(`Reaction failed because of: ${ex.message}`);
    }
  }
}

module.exports = OtterPicCommand;
