require('dotenv').config();
import DiscordJS, { Intents, TextChannel } from 'discord.js';
import express, { NextFunction, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import MessageHandler from './handlers/MessageHandler';
import EmojiLookup from './commands/EmojiLookup';
import CommandLookup from './commands/CommandLookup';
import { initializeDb } from './models/Init';

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
initializeDb();
// load in MessageHandler
const messageHandler: MessageHandler = new MessageHandler(process.env.PREFIX);

// load in emojiLookup and commandlookup
const emojiLookup: EmojiLookup = new EmojiLookup(client);
export { emojiLookup };
const commandLookup: CommandLookup = new CommandLookup();
export { commandLookup };

// Execute migrations within app
(async () => {
  const { exec } = require('child_process');

  await new Promise<void>((resolve, reject) => {
    const migrate = exec(
      'npm run migrate',
      { env: process.env },
      (err: any, stdout: any, stderr: any) => resolve()
    );

    migrate.stdout.on('data', (data: string | string[]) => {
      console.log(data);
      migrate.kill();
    });
  });
})();

// init discord client
client.on('ready', () => {
  emojiLookup.init();

  // setup webhook handler
  let router: Router = express.Router();
  app.use('/api', routes(router, client));
  app.listen(process.env.PORT);

  console.log(`Logged in as ${client.user!.tag}!`);
});

// use message handler to handle messages
client.on('messageCreate', (msg) => {
  messageHandler.handle(msg);
});

// start the bot
client.login(process.env.DISCORD_TOKEN);

/* eslint-disable-next-line no-unused-vars */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.sendStatus(500);
});

process.on('uncaughtException', (err: Error) => {
  console.log(`Uncaught Exception: ${err.stack}`);
  // process.exit(1) Best practice is to exit app on errors so that Docker can restart automatically
});

process.on('unhandledRejection', (err: Error) => {
  console.log(`Unhandled rejection: ${err.stack}`);
});
