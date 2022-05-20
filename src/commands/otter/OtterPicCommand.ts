import Command from '../Command';
import { emojiLookup } from './../../app';
import axios, { AxiosResponse } from 'axios';
import Discord from 'discord.js';

/**
 * Fetches an otter picture from r/otters
 */
export default class OtterPicCommand extends Command {
  constructor() {
    super(
      'otter',
      ['otterpic'],
      'Fetches random otterpic from r/otters.',
      `${process.env.PREFIX}otter`,
      true
    );
  }

  async execute(msg: Discord.Message) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    try {
      // make api call
      const result: AxiosResponse<any> = await axios.get(
        'https://www.reddit.com/r/Otters.json?limit=100'
      );
      const posts: Array<any> = result.data.data.children;

      // grab random post
      let randomPost: string = '';
      let attempts: number = 0;
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
      const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setColor('#0088ff')
        .setTitle('Random Otter')
        .setImage(randomPost)
        .setTimestamp()
        .setFooter({ text: 'Eerlijk gestolen van r/Otters' });

      msg.channel.send({ embeds: [embed] });
    } catch (ex) {
      throw new Error('Something went wrong when reaching Reddit');
    }

    // react with otter-handsup
    emojiLookup.react(msg, emojiLookup.get('HANDSUP'));
  }
}
