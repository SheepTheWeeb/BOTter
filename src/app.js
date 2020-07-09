require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

//load in MessageHandler
const MessageHandler = require('./MessageHandler');
const messageHandler = MessageHandler(process.env.PREFIX);

//starting message
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//use message handler to handle messages
client.on('message', msg => {
  messageHandler.handle(msg);
});

//start the bot
client.login(process.env.DISCORD_TOKEN);
