/**
 * MessageHandler is a factory object which handles all of the discord messages it receives
 *
 * @param {*} prefix Prefix for every command
 */
const MessageHandler = (prefix) => {
  const messageHandler = {};
  messageHandler.prefix = prefix;

  /**
   * A function to handle all of the incoming discord messages
   *
   * @param {*} msg The message that it reads from discord
   */
  messageHandler.handle = (msg) => {
    // Stop if the message is from a bot
    if (msg.author.bot) return;

    let msgString = msg.content;

    // Validate and remove prefix
    if (msgString.startsWith(messageHandler.prefix)) {
      msgString = msgString.replace(messageHandler.prefix, '');
    } else {
      return;
    }

    // get command arguments
    const splitCommand = msgString.split(' ');
    const primaryCommand = splitCommand[0];
    const args = splitCommand.slice(1);

    // Execute commands
    if (commandLookup.exists(primaryCommand)) {
      const command = commandLookup.get(primaryCommand);

      if (command !== null) {
        command.execute(msg, args);
      }
    }
  };

  // return messagehandler object
  return messageHandler;
};

// Export messagehandler so it can be imported into other files
module.exports = MessageHandler;
