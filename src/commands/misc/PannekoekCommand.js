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

  static async execute(msg) {
    msg.reply('je bent een pannekoek.');
    msg.react('🥞');
  }
}

module.exports = PannekoekCommand;
