const Command = require('../Command');
const { user, redflag } = require('../../models');

/**
 * You can give red flags/cards to people
 */
class OtterRoodCommand extends Command {
  constructor() {
    super(
      'rood',
      ['rodekaart', 'kaart'],
      'Gives red card to someone.',
      `${process.env.PREFIX}rood <user> <reason>`,
      true
    );
  }

  static async execute(msg, args) {
    // grab the tagged user and reason of the rode kaart
    const taggedUser = args[0];
    args.shift();
    const reason = args.join(' ');

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
    const mentionedUser = msg.mentions.users.first();
    if (!mentionedUser) {
      msg.reply(
        "In order to give a 'rode kaart', you need to tag a valid user."
      );
      return;
    }

    // look up if the user that will receive the redflag already exists in the database
    let receiver = await user.findOne({
      where: {
        discord_id: mentionedUser.id
      }
    });

    // if it does not exist, create one
    if (!receiver) {
      receiver = await user.create({
        discord_id: mentionedUser.id,
        discord_tag: mentionedUser.tag
      });
    }

    // look up if the user that will give the redflag already exists in the database
    let giver = await user.findOne({
      where: {
        discord_id: msg.author.id
      }
    });

    // if it does not exist, create one
    if (!giver) {
      giver = await user.create({
        discord_id: msg.author.id,
        discord_tag: msg.author.tag
      });
    }

    // save the rode kaart
    await redflag.create({
      user_id: receiver.id,
      received_from: giver.id,
      reason,
      double_red: false
    });

    // send a reply message with an emoji
    msg.channel.send(`Rood! ${emojiLookup.get('rode_kaart')}`);
  }
}

module.exports = OtterRoodCommand;
