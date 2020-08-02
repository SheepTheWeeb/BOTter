const Command = require("./../Command");
const { user, redflag } = require("./../../models");

/**
 * gives the last 10 redflags
 */
class OtterTotaalKaartenCommand extends Command {
  constructor() {
    super(
      "totaalkaarten",
      ["totaalrood", "totalflags"],
      "Gives the number of redflags you have (and counts double red as 2).",
      process.env.PREFIX + "totaalrood <user>",
      true
    );
  }

  async execute(msg, args) {
    var intendedUser;
    var messagePart = "";

    //check if there are arguments
    if (args.length !== 0) {
      //grab first argument
      const taggedUser = args[0];

      //check if it is a user
      if (!/^<@(!)?[0-9]+>$/i.test(taggedUser)) {
        msg.reply(
          "In order to give a 'rode kaart', you need to tag a user first."
        );
        return;
      }

      //get mentioned user
      const mentionedUser = msg.mentions.users.first();
      if (!mentionedUser) {
        msg.reply(
          "In order to give a 'rode kaart', you need to tag a valid user."
        );
        return;
      }

      // look up the user
      intendedUser = await user.findOne({
        where: {
          discord_id: mentionedUser.id,
        },
      });

      messagePart = `${intendedUser.discord_tag} has`;
    } else {
      // look up the user
      intendedUser = await user.findOne({
        where: {
          discord_id: msg.author.id,
        },
      });

      messagePart = "you have";
    }

    //check if the user is in database
    if (!intendedUser) {
      msg.reply(
        taggedUser + ` has no redflags. ${emojiLookup.get("otterKEK")}`
      );
      return;
    }

    //show last 10 redflags
    var flags = await redflag.findAll({
      where: {
        user_id: intendedUser.id,
      },
      attributes: ["double_red"],
    });

    const thinkEmoji = emojiLookup.get("otterthink");

    var count = 0;
    flags.forEach((flag) => {
      if (flag.double_red) {
        count += 2;
      } else {
        count++;
      }
    });

    //send a reaction with an emoji
    msg.reply(`${messagePart} ${count} red flags. ${thinkEmoji}`);
    msg.react(thinkEmoji);
  }
}

module.exports = OtterTotaalKaartenCommand;
