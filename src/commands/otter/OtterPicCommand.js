const Command = require("./../Command");
const axios = require("axios");
const Discord = require("discord.js");

/**
 * Fetches an otter picture from r/otters
 */
class OtterPicCommand extends Command {
  constructor() {
    super(
      "otter",
      ["otterpic"],
      "Fetches random otterpic from r/otters.",
      process.env.PREFIX + "otter",
      true
    );
  }

  async execute(msg, args) {
    try {
      //make api call
      let result = await axios.get(
        "https://www.reddit.com/r/Otters.json?limit=100"
      );
      let posts = result.data.data.children;

      //grab random post
      var randomPost = "";
      var attempts = 0;
      do {
        randomPost = posts[Math.floor(Math.random() * posts.length)].data.url;
        attempts++;
      } while (
        !(/[\/.](gif|jpg|jpeg|png)$/i.test(randomPost) || attempts >= 100)
      );

      //image not found
      if (attempts >= 100) {
        msg.reply("Did 100 attempts, image not found...");
        return;
      }

      //image found
      const embed = new Discord.MessageEmbed()
        .setColor("#0088ff")
        .setTitle("Random Otter")
        .setImage(randomPost)
        .setTimestamp()
        .setFooter("Eerlijk gestolen van r/Otters");
      msg.channel.send(embed);
    } catch (ex) {
      throw new Error("Something went wrong when reaching Reddit");
    }

    //react with otter-handsup
    try {
      msg.react(emojiLookup.get("HANDSUP"));
    } catch (ex) {
      throw new Error("Reaction failed because of: " + ex.message);
    }
  }
}

module.exports = OtterPicCommand;
