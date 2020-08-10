import Discord from 'discord.js';
import { emojiLookup } from './../app';

export default {
  async handle(req: any, res: any, client: any) {
    // grab otter discord server and log channel
    const otterGuild: any = client.guilds.cache.find(
      (guild: any) => guild.id === '730511256682889319'
    );
    const logChannel: any = otterGuild.channels.cache.find(
      (channel: any) => channel.id === '738358619032256593'
    );

    // only grab first name and picture
    const jiraName: string = req.body.user.displayName.split(' ')[0];
    const jiraPics: any = req.body.user.avatarUrls;

    // create readable message fore webhookevent type
    let eventType: string = '';
    switch (req.body.webhookEvent) {
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

    // create embed
    const embed = new Discord.MessageEmbed()
      .setColor('#0088ff')
      .setAuthor(jiraName, jiraPics[Object.keys(jiraPics)[0]])
      .setTitle(
        `${eventType}: ${req.body.issue.key} ${emojiLookup.get('HANDSUP')}`
      )
      .setTimestamp()
      .setFooter('Ik ben er helemaal klaar mee...')
      .setDescription(req.body.issue.fields.summary);

    // check if there is a changelog
    if (req.body.changelog) {
      // put every change into a field
      req.body.changelog.items.forEach((item: any) => {
        // to prevent doxxing :monkaS:
        if (item.field === 'reporter') return;
        if (item.field === 'assignee') return;

        embed.addField(
          item.field,
          `**Changed from:** ${item.fromString}\n**Changed to:** ${item.toString}`,
          true
        );
      });
    }

    // send message and completed response status
    logChannel.send(embed);
    res.sendStatus(200);
  }
};
