require('dotenv').config();
import appInsights = require('applicationinsights');
import Discord from 'discord.js';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import MessageHandler from './handlers/MessageHandler';
import EmojiLookup from './commands/EmojiLookup';
import CommandLookup from './commands/CommandLookup';
import { initializeDb } from './models/Init';

const client = new Discord.Client();
const app = express();
app.use(bodyParser.json());
initializeDb();
// load in MessageHandler
const messageHandler = new MessageHandler(process.env.PREFIX);

//Init Microsoft Application Insights
appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start();

const insightsClient = new appInsights.TelemetryClient(
  process.env.APPINSIGHTS_INSTRUMENTATIONKEY
);
export { insightsClient };
// load in emojiLookup and commandlookup
const emojiLookup = new EmojiLookup(client);
export { emojiLookup };
const commandLookup = new CommandLookup();
export { commandLookup };

// init discord client
client.on('ready', async () => {
  // setup webhook handler
  let router: any = express.Router();
  app.use('/api', routes(router, client));
  app.listen(process.env.PORT);

  console.log(`Logged in as ${client.user!.tag}!`);
});

// use message handler to handle messages
client.on('message', (msg: any) => {
  messageHandler.handle(msg);
});

// start the bot
client.login(process.env.DISCORD_TOKEN);

/* eslint-disable-next-line no-unused-vars */
app.use((err: Error, req: any, res: any, next: any) => {
  console.log(err);
  res.sendStatus(500);
});

process.on('uncaughtException', (err: Error) => {
  insightsClient.trackException({
    exception: err
  });
  console.log(`Uncaught Exception: ${err.stack}`);
  // process.exit(1) Best practice is to exit app on errors so that Docker can restart automatically
});

process.on('unhandledRejection', (err: Error) => {
  insightsClient.trackException({
    exception: err
  });
  console.log(`Unhandled rejection: ${err.stack}`);
});
