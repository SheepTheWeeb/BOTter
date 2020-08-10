import Command from '../Command';
import { commandLookup } from './../../app';
const Discord = require('discord.js');

/**
 * PingCommand class, this is the first command created for the bot
 * It simply replies with 'Pong!' when you type this command.
 */
export default class HelpCommand extends Command {
  constructor() {
    super(
      'help',
      ['hulp', 'commands'],
      'Shows each command and usage.',
      `${process.env.PREFIX}help`,
      true
    );
  }

  async execute(msg: any) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    // grab all commands
    const { commands } = commandLookup;
    const MAX_MESSAGE_LENGTH: number = 1000;

    // create string with command + usage
    let commandString: string = '';
    for (let i: number = 0; i < commands.length; i++) {
      if (commands[i].enabled) {
        let aliases: string = '';
        commands[i].alias.forEach((name: string) => {
          aliases += `| **${name}** `;
        });

        commandString += `\n**${commands[i].name}** ${aliases}- ${commands[i].usage} - ${commands[i].description}`;
      }
    }

    // create embed message
    const embed = new Discord.MessageEmbed()
      .setColor('#0088ff')
      .setTitle('All commands + usage')
      .setTimestamp()
      .setFooter('O T T E R F R A N K');

    // check if message is too large for discord
    if (commandString.length >= MAX_MESSAGE_LENGTH) {
      // split the message and create a charactercounter
      const parts: Array<string> = commandString.split('\n');
      parts.shift();
      let characterCount: number = 0;
      let newCommandString: string = '';

      // for every sentence
      for (let i: number = 0; i < parts.length; i++) {
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
