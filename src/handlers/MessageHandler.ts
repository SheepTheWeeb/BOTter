import { commandLookup } from './../app';

export default class MessageHandler {
  prefix: string;

  constructor(prefix: string | undefined) {
    this.prefix = prefix!;
  }

  /**
   * A function to handle all of the incoming discord messages
   *
   * @param {*} msg The message that it reads from discord
   */
  public handle(msg: any): void {
    // Stop if the message is from a bot
    if (msg.author.bot) return;

    let msgString: string = msg.content;

    // Validate and remove prefix
    if (msgString.startsWith(this.prefix)) {
      msgString = msgString.replace(this.prefix, '');
    } else {
      return;
    }

    // get command arguments
    const splitCommand: Array<string> = msgString.split(' ');
    const primaryCommand: string = splitCommand[0];
    const args: Array<string> = splitCommand.slice(1);

    // Execute commands
    if (commandLookup.exists(primaryCommand)) {
      const command = commandLookup.get(primaryCommand);

      if (command !== null) {
        command.execute(msg, args);
      }
    }
  }
}
