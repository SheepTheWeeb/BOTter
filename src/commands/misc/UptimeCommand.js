const Command = require('../Command');

/**
 * Tells how long the bot has been running
 */
class UptimeCommand extends Command {
  constructor() {
    super(
      'uptime',
      [],
      'Tells how long the bot has been running.',
      `${process.env.PREFIX}uptime`,
      true
    );

    this.uptime = Date.now();
  }

  async execute(msg) {
    // calculate difference
    const diff = Date.now() - this.uptime;

    // calculate seconds, minutes, hours and days
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);

    // create uptime message
    let message = '';

    if (days > 0) {
      message += `${days} days, `;
    }
    if (hours > 0 || days > 0) {
      message += `${hours} hours, `;
    }
    if (minutes > 0 || hours > 0) {
      message += `${minutes} minutes and `;
    }

    message += `${seconds} seconds`;

    // reply with uptime message
    msg.channel.send(`Uptime is: ${message}`);
    msg.react('🕒');
  }
}

module.exports = UptimeCommand;
