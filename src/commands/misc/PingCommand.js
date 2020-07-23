const Command = require('./../Command');

/**
 * PingCommand class, this is the first command created for the bot
 * It simply replies with 'Pong!' when you type this command.
 */
class PingCommand extends Command {

  constructor() {
    super("ping", ["pong", "test"], "Ping command, answers with 'Pong!'.", 
      process.env.PREFIX + "ping", true)
  }

  async execute(msg, args) {
    try {
      if(args.length == 0) {
        //test reply
        msg.reply('Pong!, your command was: ' + msg.content);
  
        //test reaction
        var handsUp = msg.guild.emojis.cache.find(emoji => emoji.name === "HANDSUP");
        msg.react(handsUp)
      } else {
        msg.reply("bananen op een fiets. ")
        msg.react("🍌")
        msg.react("🚴‍♂️")
      }

    } catch(ex) {
      console.log(ex.message)
    }
  }
}

module.exports = PingCommand;