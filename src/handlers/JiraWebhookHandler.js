const Discord = require('discord.js');

module.exports = {
  async handle(req, res, client) {

    console.log(req.body)

    try {
      //grab otter discord server and log channel
      var otterGuild = client.guilds.cache.find(guild => guild.id === '730511256682889319');
      var logChannel = otterGuild.channels.cache.find(channel => channel.id === '738358619032256593');

      //create message
      var description = `Key: ${req.body.issue.key}` +
        `\nTitle: ${req.body.issue.fields.summary}` +
        `\nBy: ${req.body.user.displayName}` +
        `\nRead more: ${req.body.issue.self}`;

      //create embed
      const embed = new Discord.MessageEmbed()
        .setColor('#0088ff')
        .setTitle(`${req.body.issue_event_type_name} ${emojiLookup.get("HANDSUP")}`)
        .setTimestamp()
        .setFooter('Ik ben er helemaal klaar mee... pls send help')
        .setDescription(description);

      logChannel.send(embed);

      res.sendStatus(200);

    } catch (ex) {
      console.log(ex.message);
      res.sendStatus(500);
    }
  }
}