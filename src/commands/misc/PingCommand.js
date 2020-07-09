const AbstractCommand = require('./../AbstractCommand');

/**
 * PingCommand class, this is the first command created for the bot
 * It simply replies with 'Pong!' when you type this command.
 */
class PingCommand extends AbstractCommand {

  constructor() {
    this.name = "ping",
    this.alias = ["pong", "test"],
    this.description = "Ping command, answers with 'Pong!'.",
    this.usage = process.env.PREFIX + "ping",
    this.enabled = true
  }

  execute(msg, arguments) {
    if(arguments.length == 0) {
      //test reply
      msg.reply('Pong!, your command was: ' + msg.content);

      //test reaction
      var handsUp = msg.guild.emojis.cache.get("730514368781090956");
      msg.react(handsUp)
    } else {
      msg.reply("bananen op een fiets. ")
      msg.react("🍌")
      msg.react("🚴‍♂️")
    }
  }
}

module.exports = PingCommand;