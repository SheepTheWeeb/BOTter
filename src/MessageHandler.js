/**
 * MessageHandler is a factory object which handles all of the discord messages it receives
 * 
 * @param {*} prefix Prefix for every command
 */
const MessageHandler = function(prefix) {
  const messageHandler = {};
  messageHandler.prefix = prefix;

  /**
   * A function to handle all of the incoming discord messages
   * 
   * @param {*} msg The message that it reads from discord
   */
  messageHandler.handle = function(msg) {
    //Stop if the message is from a bot
    if(msg.author.bot) return;

    //Validate and remove prefix
    if(msg.content.startsWith(this.prefix)) {
      msg.content = msg.content.replace(this.prefix, "");
    } else { return; }

    //get command arguments
    let splitCommand = msg.content.split(" ");
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);

    //Execute commands

    //testcommand
    if (primaryCommand === 'ping') {
      //test reply
      msg.reply('Pong!, your command was: ' + msg.content);

      //test reaction
      var handsUp = msg.guild.emojis.cache.get("730514368781090956");
      msg.react(handsUp)
    }
  }

  //return messagehandler object
  return messageHandler;
}

//Export messagehandler so it can be imported into other files
module.exports = MessageHandler;