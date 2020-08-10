import Command from '../Command';

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

  async execute(msg: any) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    msg.reply('je bent een pannekoek.');
    msg.react('🥞');
  }
}
