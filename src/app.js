require('dotenv').config();
const Discord = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser')

//init clients
const client = new Discord.Client();
const app = express();
app.use(bodyParser.json());

//load in Database
const { sequelize } = require('./models');

//load in MessageHandler
const MessageHandler = require('./handlers/MessageHandler');
const messageHandler = MessageHandler(process.env.PREFIX);

//init discord client
client.on('ready', async () => {
  //synchronize all the database tables
  await sequelize.sync();

  //load in emojiLookup and commandlookup
  global.emojiLookup = require('./commands/EmojiLookup')(client);
  global.commandLookup = require('./commands/CommandLookup')(client);

  //setup webhook handler
  const router = express.Router();
  app.use('/api', require('./routes')(router, client));
  app.listen(process.env.PORT);

  console.log(`Logged in as ${client.user.tag}!`);
});

//use message handler to handle messages
client.on('message', msg => {
  messageHandler.handle(msg);
});

//start the bot
client.login(process.env.DISCORD_TOKEN);
