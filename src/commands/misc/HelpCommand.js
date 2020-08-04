const Discord = require('discord.js');
const Command = require('../Command');

/**
 * PingCommand class, this is the first command created for the bot
 * It simply replies with 'Pong!' when you type this command.
 */
class HelpCommand extends Command {
  constructor() {
    super(
      'help',
      ['hulp', 'commands'],
      'Shows each command and usage.',
      `${process.env.PREFIX}help`,
      true
    );
  }

  async execute(msg) {
    // check if command is enabled
    if (!this.enabled) {
      logger.error(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    // grab all commands
    const { commands } = commandLookup;
    const MAX_MESSAGE_LENGTH = 1000;

    // create string with command + usage
    let commandString = '';
    Object.keys(commands).forEach((e) => {
      if (commands[e].enabled) {
        let aliases = '';
        commands[e].alias.forEach((name) => {
          aliases += `| **${name}** `;
        });

        commandString += `\n**${commands[e].name}** ${aliases}- ${commands[e].usage} - ${commands[e].description}`;
      }
    });

    // create embed message
    const embed = new Discord.MessageEmbed()
      .setColor('#0088ff')
      .setTitle('All commands + usage')
      .setTimestamp()
      .setFooter('O T T E R F R A N K');

    // check if message is too large for discord
    if (commandString.length >= MAX_MESSAGE_LENGTH) {
      // split the message and create a charactercounter
      const parts = commandString.split('\n');
      parts.shift();
      let characterCount = 0;
      let newCommandString = '';

      // for every sentence
      for (let i = 0; i < parts.length; i++) {
        // add line length to count
        characterCount += parts[i].length;
        newCommandString += `\n${parts[i]}`;

        // if it goes over the character limit
        if (characterCount >= MAX_MESSAGE_LENGTH) {
          // send the message
          embed.setDescription(newCommandString);
          msg.channel.send(embed);

          // reset the counter
          newCommandString = '';
          characterCount = 0;
        }

        // if it reaches the end send the message
        if (i === parts.length - 1 && newCommandString !== '') {
          embed.setDescription(newCommandString);
          msg.channel.send(embed);
        }
      }
    } else {
      // reply
      embed.setDescription(commandString);
      msg.channel.send(embed);
    }
  }
}

module.exports = HelpCommand;
