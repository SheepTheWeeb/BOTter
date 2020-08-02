const Command = require("./../Command");
const Discord = require("discord.js");
const { user, redflag } = require("./../../models");

/**
 * gives the last 10 redflags
 */
class OtterKaartenCommand extends Command {
  constructor() {
    super(
      "kaarten",
      ["rodekaarten", "redflags"],
      "Gives the last 10 received redflags.",
      process.env.PREFIX + "kaarten <user>",
      true
    );
  }

  async execute(msg, args) {
    var intendedUser;

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
    } else {
      // look up the user
      intendedUser = await user.findOne({
        where: {
          discord_id: msg.author.id,
        },
      });
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
      include: [
        {
          model: user,
          as: "giver",
          attributes: ["discord_tag"],
        },
      ],
      where: {
        user_id: intendedUser.id,
      },
      limit: 10,
      order: [["updated_at", "DESC"]],
    });

    const disgustedEmoji = emojiLookup.get("disgustedotter");

    //set a max message length
    const MAX_MESSAGE_LENGTH = 1000;

    //create string with red flags
    var flagString = "";
    flags.forEach((flag) => {
      let doublered = flag.double_red ? "Yes" : "No";
      flagString += `\n**${flag.updatedAt.toLocaleDateString(
        "en-US"
      )}** - From **${flag.giver.discord_tag}**, reason: ${
        flag.reason
      }. Double red? **${doublered}** ${disgustedEmoji}`;
    });

    //create embed message
    const embed = new Discord.MessageEmbed()
      .setColor("#0088ff")
      .setTitle(`Redflags ${disgustedEmoji}`)
      .setTimestamp()
      .setFooter("Je kenne niet altijd 6 gooie...");

    //check if message is too large for discord
    if (flagString.length >= MAX_MESSAGE_LENGTH) {
      //split the message and create a charactercounter
      var parts = flagString.split("\n");
      parts.shift();
      var characterCount = 0;
      var newFlagString = "";

      //for every sentence
      for (var i = 0; i < parts.length; i++) {
        //add line length to count
        characterCount += parts[i].length;
        newFlagString += "\n" + parts[i];

        //if it goes over the character limit
        if (characterCount >= MAX_MESSAGE_LENGTH) {
          //send the message
          embed.setDescription(newFlagString);
          msg.channel.send(embed);

          //reset the counter
          newFlagString = "";
          characterCount = 0;
        }

        //if it reaches the end send the message
        if (i == parts.length - 1 && newFlagString !== "") {
          embed.setDescription(newFlagString);
          msg.channel.send(embed);
        }
      }
    } else {
      //reply
      embed.setDescription(flagString);
      msg.channel.send(embed);
    }
    //send a reaction with an emoji
    msg.react(disgustedEmoji);
  }
}

module.exports = OtterKaartenCommand;
