const Command = require('./../Command');
const Discord = require('discord.js');

/**
 * PingCommand class, this is the first command created for the bot
 * It simply replies with 'Pong!' when you type this command.
 */
class HelpCommand extends Command {

  constructor() {
    super("help", ["hulp", "commands"], "Shows each command and usage.", 
      process.env.PREFIX + "help", true)
  }

  async execute(msg, args) {
    //grab all commands
    const commands = commandLookup.commands;
    const MAX_MESSAGE_LENGTH = 1000;

    //create string with command + usage
    var commandString = '';
    Object.keys(commands).forEach(e => {
      if(commands[e].enabled) {

        var aliases = '';
        commands[e].alias.forEach(name => {
          aliases += '| **' + name + '** ';
        })

        commandString += '\n**' + commands[e].name + '** ' + aliases + '- ' + commands[e].usage + ' - ' + commands[e].description;
      }
    });

    //create embed message
    const embed = new Discord.MessageEmbed()
      .setColor('#0088ff')
      .setTitle('All commands + usage')
      .setTimestamp()
      .setFooter('O T T E R F R A N K');

    try {
      //check if message is too large for discord
      if(commandString.length >= MAX_MESSAGE_LENGTH) {
        //TODO: fix later
        msg.reply('zeg ff tegen Sheep dat hij zijn shit moet fixen.')

      } else {
        //reply
        embed.setDescription(commandString)
        msg.channel.send(embed);
      }
      
    } catch(ex) {
      console.log(ex.message);
    }
  }
}

module.exports = HelpCommand;