const Command = require('../Command');

/**
 * Calls you a pannekoek
 */
class PannekoekCommand extends Command {
  constructor() {
    super(
      'pannekoek',
      [],
      "Calls you a 'Pannekoek'.",
      `${process.env.PREFIX}pannekoek`,
      true
    );
  }

  async execute(msg) {
    // check if command is enabled
    if (!this.enabled) {
      logger.error(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    msg.reply('je bent een pannekoek.');
    msg.react('🥞');
  }
}

module.exports = PannekoekCommand;
