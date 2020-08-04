const PingCommand = require('./misc/PingCommand');
const PannekoekCommand = require('./misc/PannekoekCommand');
const OtterPicCommand = require('./otter/OtterPicCommand');
const OtterFactCommand = require('./otter/OtterFactCommand');
const OtterRoodCommand = require('./otter/OtterRoodCommand');
const OtterDubbelRoodCommand = require('./otter/OtterDubbelRoodCommand');
const OtterKaartenCommand = require('./otter/OtterKaartenCommand');
const OtterTotaalKaartenCommand = require('./otter/OtterTotaalKaartenCommand');
const HelpCommand = require('./misc/HelpCommand');
const UptimeCommand = require('./misc/UptimeCommand');
const OtterHighscoreCommand = require('./otter/OtterHighscoreCommand');
const OtterRankCommand = require('./otter/OtterRankCommand');
const insightsClient = require('../app');

/**
 * loads in all commands
 *
 * @param {*} commands
 */
function loadCommands(commands) {
  const tempCommands = {};

  Object.keys(commands).forEach((e) => {
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
  const aliases = {};

  Object.keys(commands).forEach((e) => {
    commands[e].alias.forEach((alias) => {
      aliases[alias] = commands[e];
    });
  });

  return aliases;
}

/**
 * class used to lookup bot commands by name or alias
 */
const CommandLookup = () => {
  const commandLookup = {};

  commandLookup.commands = {};
  commandLookup.aliases = {};

  /**
   * init the commandlookup class
   */
  commandLookup.init = () => {
    const commands = {
      PingCommand: new PingCommand(),
      PannekoekCommand: new PannekoekCommand(),
      HelpCommand: new HelpCommand(),
      UptimeCommand: new UptimeCommand(),
      OtterPicCommand: new OtterPicCommand(),
      OtterFactCommand: new OtterFactCommand(),
      OtterRoodCommand: new OtterRoodCommand(),
      OtterDubbelRoodCommand: new OtterDubbelRoodCommand(),
      OtterKaartenCommand: new OtterKaartenCommand(),
      OtterTotaalKaartenCommand: new OtterTotaalKaartenCommand(),
      OtterHighscoreCommand: new OtterHighscoreCommand(),
      OtterRankCommand: new OtterRankCommand()
    };

    commandLookup.commands = loadCommands(commands);
    commandLookup.aliases = loadAlias(commands);
  };

  /**
   * Get bot command by name or alias
   *
   * @param {*} commandName name or alias of the bot command
   */
  commandLookup.get = (commandName) => {
    let command = null;

    // exists is a function from commandLookup
    if (!commandLookup.exists(commandName)) {
      insightsClient.trackTrace('Command does not exist');
      return command;
    }

    Object.keys(commandLookup.commands).forEach((e) => {
      if (commandName === e && commandLookup.commands[e].enabled) {
        command = commandLookup.commands[e];
      }
    });

    Object.keys(commandLookup.aliases).forEach((e) => {
      if (commandName === e && commandLookup.aliases[e].enabled) {
        command = commandLookup.aliases[e];
      }
    });

    return command;
  };

  /**
   * looks if a botcommand exists
   *
   * @param {*} commandName
   */
  commandLookup.exists = (commandName) => {
    let found = false;
    Object.keys(commandLookup.commands).forEach((e) => {
      if (commandName === e) {
        found = true;
      }
    });

    Object.keys(commandLookup.aliases).forEach((e) => {
      if (commandName === e) {
        found = true;
      }
    });

    return found;
  };

  // return lookup object
  commandLookup.init();
  return commandLookup;
};

// export object to make accessible via other files
module.exports = CommandLookup;
