const Command = require("./../Command");

/**
 * Calls you a pannekoek
 */
class PannekoekCommand extends Command {
  constructor() {
    super(
      "pannekoek",
      [],
      "Calls you a 'Pannekoek'.",
      process.env.PREFIX + "pannekoek",
      true
    );
  }

  async execute(msg, args) {
    msg.reply("je bent een pannekoek.");
    msg.react("🥞");
  }
}

module.exports = PannekoekCommand;
