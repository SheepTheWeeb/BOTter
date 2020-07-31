const Discord = require('discord.js');

module.exports = {
  async handle(req, res, client) {

    try {
      //grab otter discord server and log channel
      var otterGuild = client.guilds.cache.find(guild => guild.id === '730511256682889319');
      var logChannel = otterGuild.channels.cache.find(channel => channel.id === '738358619032256593');

      //only grab first name and picture
      var jiraName = req.body.user.displayName.split(" ")[0];
      var jiraPics = req.body.user.avatarUrls;

      //create readable message fore webhookevent type
      var eventType = '';
      switch(req.body.webhookEvent) {
        case 'jira:issue_created':
          eventType = 'Ticket Created';
          break;
        case 'jira:issue_updated':
          eventType = 'Ticket Updated';
          break;
        case 'jira:issue_deleted':
          eventType = 'Ticket Deleted';
          break;
        default:
          eventType = req.body.webhookEvent;
      }

      //create embed
      const embed = new Discord.MessageEmbed()
        .setColor('#0088ff')
        .setAuthor(jiraName, jiraPics[Object.keys(jiraPics)[0]])
        .setTitle(`${eventType}: ${req.body.issue.key} ${emojiLookup.get("HANDSUP")}`)
        .setTimestamp()
        .setFooter('Ik ben er helemaal klaar mee...')
        .setDescription(req.body.issue.fields.summary);

      //check if there is a changelog
      if(req.body.changelog) {

        //put every change into a field
        req.body.changelog.items.forEach(item => {
          //to prevent doxxing :monkaS:
          if(item.field === 'reporter') return;
          if(item.field === 'assignee') return;

          embed.addField(item.field, `**Changed from:** ${item.fromString}\n**Changed to:** ${item.toString}`, true);
        });
      }

      //send message and completed response status
      logChannel.send(embed);
      res.sendStatus(200);

    } catch (ex) {
      console.log(ex.message);
      res.sendStatus(500);
    }
  }
}