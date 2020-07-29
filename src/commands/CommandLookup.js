const PingCommand = require('./misc/PingCommand');
const PannekoekCommand = require('./misc/PannekoekCommand')
const OtterPicCommand = require('./otter/OtterPicCommand');
const OtterFactCommand = require('./otter/OtterFactCommand');
const OtterRoodCommand = require('./otter/OtterRoodCommand');
const OtterDubbelRoodCommand = require('./otter/OtterDubbelRoodCommand');
const OtterKaartenCommand = require('./otter/OtterKaartenCommand');
const OtterTotaalKaartenCommand = require('./otter/OtterTotaalKaartenCommand');
const HelpCommand = require('./misc/HelpCommand');

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
      PannekoekCommand: new PannekoekCommand(),
      HelpCommand: new HelpCommand(),
      OtterPicCommand: new OtterPicCommand(),
      OtterFactCommand: new OtterFactCommand(),
      OtterRoodCommand: new OtterRoodCommand(),
      OtterDubbelRoodCommand: new OtterDubbelRoodCommand(),
      OtterKaartenCommand: new OtterKaartenCommand(),
      OtterTotaalKaartenCommand: new OtterTotaalKaartenCommand(),
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

    // exists is a function from commandLookup
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
  commandLookup.init();
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
