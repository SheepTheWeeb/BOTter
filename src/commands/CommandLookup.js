const PingCommand = require('./misc/PingCommand');
const OtterPicCommand = require('./otter/OtterPicCommand');
const OtterFactCommand = require('./otter/OtterFactCommand');

/**
 * class used to lookup bot commands by name or alias
 */
const CommandLookup = function() {
  const commandLookup = {};

  commandLookup.commands = {}
  commandLookup.aliases = {}
  
  /**
   * init the commandlookup class
   */
  commandLookup.init = function() {
    const commands = {
      PingCommand: new PingCommand(),
      OtterPicCommand: new OtterPicCommand(),
      OtterFactCommand: new OtterFactCommand(),
    }

    this.commands = loadCommands(commands);
    this.aliases = loadAlias(commands);
  }

  /**
   * Get bot command by name or alias
   * 
   * @param {*} commandName name or alias of the bot command
   */
  commandLookup.get = function(commandName) {
    var command = null;

    if(!this.exists(commandName)) {
      console.log("Command does not exist");
      return command;
    }

    Object.keys(this.commands).forEach(e => {
      if(commandName === e && this.commands[e].enabled) {
        command = this.commands[e];
      }
    });

    Object.keys(this.aliases).forEach(e => {
      if(commandName === e && this.aliases[e].enabled) {
        command = this.aliases[e];
      }
    });

    return command;
  }

  /**
   * looks if a botcommand exists
   * 
   * @param {*} commandName 
   */
  commandLookup.exists = function(commandName) {
    var found = false;
    Object.keys(this.commands).forEach(e => {
      if(commandName === e) {
        found = true;
      }
    });

    Object.keys(this.aliases).forEach(e => {
      if(commandName === e) {
        found = true;
      }
    });

    return found;
  }

  //return lookup object
  return commandLookup;
}


/**
 * loads in all commands
 * 
 * @param {*} commands 
 */
function loadCommands(commands) {
  var tempCommands = {};

  Object.keys(commands).forEach(e => {
    tempCommands[commands[e].name] = commands[e];
  });

  return tempCommands;
}

/**
 * loads in all aliases
 * 
 * @param {*} commands 
 */
function loadAlias(commands) {
  var aliases = {};

  Object.keys(commands).forEach(e => {
    commands[e].alias.forEach(alias => aliases[alias] = commands[e])
  });

  return aliases;
}

//export object to make accessible via other files
module.exports = CommandLookup;
