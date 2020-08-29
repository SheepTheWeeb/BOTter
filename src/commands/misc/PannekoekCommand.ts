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
    // get mentioned user
    const mentionedUser: Discord.User | undefined = msg.mentions.users.first();
    if (!mentionedUser) {
      msg.reply('je bent een pannekoek.');
      msg.react('🥞');
    } else {
      msg.channel.send(`<@${mentionedUser.id}>, je bent een pannekoek.`);
      msg.react('🥞');
    }
  }
}
