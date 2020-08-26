import Command from '../Command';
import Discord from 'discord.js';

/**
 * Tells how long the bot has been running
 */
export default class UptimeCommand extends Command {
  uptime: number;

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

  async execute(msg: Discord.Message) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    // calculate difference
    const diff: number = Date.now() - this.uptime;

    // calculate seconds, minutes, hours and days
    const seconds: number = Math.floor((diff / 1000) % 60);
    const minutes: number = Math.floor((diff / 1000 / 60) % 60);
    const hours: number = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days: number = Math.floor(diff / 1000 / 60 / 60 / 24);

    // create uptime message
    let message: string = '';

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
