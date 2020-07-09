const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NzMwNTQyNjA4NDU1MDQxMDc0.XwZCVA.1_Wbbj0hJ5g3jIoUKnPOfcpNMI8');