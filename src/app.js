require('dotenv').config();
const appInsights = require('applicationinsights');
const Discord = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');

// init logger
global.logger = require('./config/LoggerConfig');

// init clients
const client = new Discord.Client();
const app = express();
app.use(bodyParser.json());

// load in Database
require('./config/PostgratorConfig')();

// load in MessageHandler
const MessageHandler = require('./handlers/MessageHandler');

const messageHandler = MessageHandler(process.env.PREFIX);

appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start();

global.insightsClient = new appInsights.TelemetryClient(
  process.env.APPINSIGHTS_INSTRUMENTATIONKEY
);

// init discord client
client.on('ready', async () => {
  // load in emojiLookup and commandlookup
  global.emojiLookup = require('./commands/EmojiLookup')(client);
  global.commandLookup = require('./commands/CommandLookup')(client);

  // setup webhook handler
  const router = express.Router();
  app.use('/api', require('./routes')(router, client));
  app.listen(process.env.PORT);

  logger.info(`Logged in as ${client.user.tag}!`);
});

// use message handler to handle messages
client.on('message', (msg) => {
  messageHandler.handle(msg);
});

// start the bot
client.login(process.env.DISCORD_TOKEN);

/* eslint-disable-next-line no-unused-vars */
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.sendStatus(500);
});

process.on('uncaughtException', (err) => {
  insightsClient.trackException({
    exception: err
  });
  logger.error(`Uncaught Exception: ${err.message}`);
  console.log(err);
  // process.exit(1) Best practice is to exit app on errors so that Docker can restart automatically
});

process.on('unhandledRejection', (err) => {
  insightsClient.trackException({
    exception: err
  });
  logger.error(`Unhandled rejection: ${err.message}`);
  console.log(err);
});
