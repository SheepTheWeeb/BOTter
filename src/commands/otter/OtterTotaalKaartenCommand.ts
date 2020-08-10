import Command from '../Command';
import { emojiLookup } from './../../app';

const { user, redflag } = require('../../models');

/**
 * gives the last 10 redflags
 */
export default class OtterTotaalKaartenCommand extends Command {
  constructor() {
    super(
      'totaalkaarten',
      ['totaalrood', 'totalflags'],
      'Gives the number of redflags you have (and counts double red as 2).',
      `${process.env.PREFIX}totaalrood <user>`,
      true
    );
  }

  async execute(msg: any, args: Array<string>) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    let intendedUser: any;
    let messagePart: string = '';
    let taggedUser: string;

    // check if there are arguments
    if (args.length !== 0) {
      // grab first argument
      const FIRST_INDEX: number = 0;
      taggedUser = args[FIRST_INDEX];

      // check if it is a user
      if (!/^<@(!)?[0-9]+>$/i.test(taggedUser)) {
        msg.reply(
          "In order to give a 'rode kaart', you need to tag a user first."
        );
        return;
      }

      // get mentioned user
      const mentionedUser: any = msg.mentions.users.first();
      if (!mentionedUser) {
        msg.reply(
          "In order to give a 'rode kaart', you need to tag a valid user."
        );
        return;
      }

      // look up the user
      intendedUser = await user.findOne({
        where: {
          discord_id: mentionedUser.id
        }
      });

      messagePart = `${intendedUser.discord_tag} has`;
    } else {
      taggedUser = msg.author.tag;

      // look up the user
      intendedUser = await user.findOne({
        where: {
          discord_id: msg.author.id
        }
      });

      messagePart = 'you have';
    }

    // check if the user is in database
    if (!intendedUser) {
      msg.reply(
        `${taggedUser} has no redflags. ${emojiLookup.get('otterKEK')}`
      );
      return;
    }

    // show last 10 redflags
    const flags: any = await redflag.findAll({
      where: {
        user_id: intendedUser.id
      },
      attributes: ['double_red']
    });

    const thinkEmoji: any = emojiLookup.get('otterthink');

    let count: number = 0;
    flags.forEach((flag: any) => {
      if (flag.double_red) {
        count += 2;
      } else {
        count += 1;
      }
    });

    // send a reaction with an emoji
    msg.reply(`${messagePart} ${count} red flags. ${thinkEmoji}`);
    msg.react(thinkEmoji);
  }
}
