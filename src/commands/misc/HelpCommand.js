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
        
        //split the message and create a charactercounter
        var parts = commandString.split("\n");
        parts.shift();
        var characterCount = 0;
        var newCommandString = '';

        //for every sentence
        for(var i = 0; i < parts.length; i++) {
          //add line length to count
          characterCount += parts[i].length;
          newCommandString += '\n' + parts[i];

          //if it goes over the character limit
          if(characterCount >= MAX_MESSAGE_LENGTH)  {
            //send the message
            embed.setDescription(newCommandString)
            msg.channel.send(embed);

            //reset the counter
            newCommandString = '';
            characterCount = 0;
          }

          //if it reaches the end send the message
          if(i == parts.length-1 && newCommandString !== '') {
            embed.setDescription(newCommandString)
            msg.channel.send(embed);
          }
        }

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