const Discord = require('discord.js');

module.exports = {
  async handle(req, res, client) {

    try {
      //grab otter discord server and log channel
      var otterGuild = client.guilds.cache.find(guild => guild.id === '730511256682889319');
      var logChannel = otterGuild.channels.cache.find(channel => channel.id === '738358619032256593');

      //create message
      var jiraName = req.body.user.displayName.split(" ")[0];
      var jiraPics = req.body.user.avatarUrls;

      //create embed
      const embed = new Discord.MessageEmbed()
        .setColor('#0088ff')
        .setAuthor(jiraName, jiraPics[Object.keys(jiraPics)[0]])
        .setTitle(`${req.body.issue.key} | ${req.body.webhookEvent} ${emojiLookup.get("HANDSUP")}`)
        .setTimestamp()
        .setFooter('Ik ben er helemaal klaar mee...')
        .setDescription(req.body.issue.fields.summary);

      logChannel.send(embed);

      res.sendStatus(200);

    } catch (ex) {
      console.log(ex.message);
      res.sendStatus(500);
    }
  }
}