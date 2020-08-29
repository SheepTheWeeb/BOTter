import Command from '../Command';
import Discord from 'discord.js';

/**
 * Calls you a pannekoek
 */
export default class PannekoekCommand extends Command {
  constructor() {
    super(
      'pannekoek',
      [],
      "Calls you a 'Pannekoek'.",
      `${process.env.PREFIX}pannekoek`,
      true
    );
  }

  async execute(msg: Discord.Message) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    msg.reply('je bent een pannekoek.');
    msg.react('🥞');
  }
}
