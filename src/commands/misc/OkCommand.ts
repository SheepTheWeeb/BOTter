import Command from '../Command';
import { emojiLookup } from './../../app';
import Discord from 'discord.js';

/**
 * OkCommand, tells that youre okay
 */
export default class OkCommand extends Command {
  constructor() {
    super(
      'ok',
      ['oksign', 'okhand'],
      'Shows that you are ok.',
      `${process.env.PREFIX}ok`,
      true
    );
  }

  async execute(msg: Discord.Message) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    const okUrl = 'https://media1.tenor.com/images/1417bce68e499228e79867d802e667c3/tenor.gif';

    // create embed message
    const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
      .setColor('#0088ff')
      .setTitle('OK')
      .setImage(okUrl)
      .setTimestamp()
      .setFooter('Het is oke');

    // msg.channel.send(embed);
    emojiLookup.react(msg, emojiLookup.get('otter'));
  }
}
