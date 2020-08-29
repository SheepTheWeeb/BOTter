import Command from '../Command';
import Discord from 'discord.js';

/**
 * Calls you a druif
 */
export default class DruifCommand extends Command {
  constructor() {
    super(
      'druif',
      [],
      "Calls you a 'Druif'.",
      `${process.env.PREFIX}druif`,
      true
    );
  }

  async execute(msg: Discord.Message) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    // get mentioned user
    const mentionedUser: Discord.User | undefined = msg.mentions.users.first();
    if (!mentionedUser) {
      msg.reply('je bent een druif.');
      msg.react('🍇');
    } else {
      msg.channel.send(`<@${mentionedUser.id}>, je bent een druif.`);
      msg.react('🍇');
    }
  }
}
