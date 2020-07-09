const PingCommand = require('./misc/PingCommand');

const CommandLookup = {
  PingCommand: new PingCommand(),

};

Object.keys(CommandLookup).forEach(e => {
  console.log(`key=${e}  value=${obj[e]}`)
  
});

const instance = CommandLookup[name]()

module.exports = new instance;
