require("dotenv").config();
const appInsights = require("applicationinsights");
const Discord = require("discord.js");
const express = require("express");
const bodyParser = require("body-parser");

//init clients
const client = new Discord.Client();
const app = express();
app.use(bodyParser.json());

//load in Database
const { sequelize } = require("./models");

//load in MessageHandler
const MessageHandler = require("./handlers/MessageHandler");
const messageHandler = MessageHandler(process.env.PREFIX);
appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start();

export const insightsClient = appInsights.defaultClient;

//init discord client
client.on("ready", async () => {
  //synchronize all the database tables
  await sequelize.sync();

  //load in emojiLookup and commandlookup
  global.emojiLookup = require("./commands/EmojiLookup")(client);
  global.commandLookup = require("./commands/CommandLookup")(client);

  //setup webhook handler
  const router = express.Router();
  app.use("/api", require("./routes")(router, client));
  app.listen(process.env.PORT);

  console.log(`Logged in as ${client.user.tag}!`);
});

//use message handler to handle messages
client.on("message", (msg) => {
  messageHandler.handle(msg);
});

//start the bot
client.login(process.env.DISCORD_TOKEN);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
});

process.on("uncaughtException", (err) => {
  insightsClient.trackException({ exception: promise });
  console.log(`Uncaught Exception: ${err.message}`);
  //process.exit(1) Best practice is to exit app on errors so that Docker can restart automatically
});

process.on("unhandledRejection", (reason, promise) => {
  insightsClient.trackException({ exception: promise });
  console.log("Unhandled rejection at ", promise, `reason: ${reason}`);
});
