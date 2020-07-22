require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

//load in Database
const { sequelize } = require('./models');

//load in MessageHandler
const MessageHandler = require('./MessageHandler');
const messageHandler = MessageHandler(process.env.PREFIX);

//load in commandlookup
const CommandLookup = require('./commands/CommandLookup');
global.commandLookup = CommandLookup();
commandLookup.init();

//init discord client
client.on('ready', async () => {
  //synchronize all the database tables
  await sequelize.sync();
  console.log(`Logged in as ${client.user.tag}!`);
});

//use message handler to handle messages
client.on('message', msg => {
  messageHandler.handle(msg);
});

//start the bot
client.login(process.env.DISCORD_TOKEN);
