import Command from '../Command';
import { emojiLookup } from './../../app';

/**
 * PingCommand class, this is the first command created for the bot
 * It simply replies with 'Pong!' when you type this command.
 */
export default class PingCommand extends Command {
  constructor() {
    super(
      'ping',
      ['pong', 'test'],
      "Ping command, answers with 'Pong!'.",
      `${process.env.PREFIX}ping`,
      true
    );
  }

  async execute(msg: any, args: Array<string>) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    if (args.length === 0) {
      // test reply
      msg.reply(`Pong!, your command was: ${msg.content}`);

      // test reaction
      msg.react(emojiLookup.get('HANDSUP'));
    } else {
      msg.reply('bananen op een fiets. ');
      msg.react('🍌');
      msg.react('🚴‍♂️');
    }
  }
}
