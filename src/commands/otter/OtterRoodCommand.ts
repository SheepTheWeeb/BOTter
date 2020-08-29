import Command from '../Command';
import Discord from 'discord.js';
import { emojiLookup } from './../../app';
import { Otteruser } from '../../models/Otteruser';
import { Redflag } from '../../models/Redflag';
/**
 * You can give red flags/cards to people
 */
export default class OtterRoodCommand extends Command {
  constructor() {
    super(
      'rood',
      ['rodekaart', 'kaart'],
      'Gives red card to someone.',
      `${process.env.PREFIX}rood <user> <reason>`,
      true
    );
  }

  async execute(msg: Discord.Message, args: Array<string>) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    // grab the tagged user and reason of the rode kaart
    const taggedUser: string = args[0];
    args.shift();
    const reason: string | undefined = args.join(' ');

    // check if there is a reason
    if (!reason) {
      msg.reply("In order to give a 'rode kaart', you need to give a reason.");
      return;
    }

    // check if string is less than
    if (reason.length > 255) {
      msg.reply('Please give me a shorter reason.');
      return;
    }

    // check if a user is mentioned
    if (!/^<@(!)?[0-9]+>$/i.test(taggedUser)) {
      msg.reply(
        "In order to give a 'rode kaart', you need to tag a user first."
      );
      return;
    }

    // get mentioned user
    const mentionedUser: Discord.User | undefined = msg.mentions.users.first();

    if (!mentionedUser) {
      msg.reply(
        "In order to give a 'rode kaart', you need to tag a valid user."
      );
      return;
    }

    // look up if the user that will receive the redflag already exists in the database
    let receiver: Otteruser | null = await Otteruser.findOne({
      where: {
        discord_id: mentionedUser.id
      }
    });

    // if it does not exist, create one
    if (!receiver) {
      receiver = await Otteruser.create({
        discord_id: mentionedUser.id,
        discord_tag: mentionedUser.tag
      });
    }

    // look up if the user that will give the redflag already exists in the database
    let giver: Otteruser | null = await Otteruser.findOne({
      where: {
        discord_id: msg.author.id
      }
    });

    // if it does not exist, create one
    if (!giver) {
      giver = await Otteruser.create({
        discord_id: msg.author.id,
        discord_tag: msg.author.tag
      });
    }

    // save the rode kaart
    await Redflag.create({
      user_id: receiver.id,
      received_from: giver.id,
      reason,
      double_red: false
    });

    // send a reply message with an emoji
    msg.channel.send(`Rood! ${emojiLookup.getStringByName('rode_kaart')}`);
  }
}
