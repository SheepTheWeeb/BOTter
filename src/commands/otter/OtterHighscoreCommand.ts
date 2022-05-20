import Command from '../Command';
import { emojiLookup } from './../../app';
import Discord from 'discord.js';
import { Redflag } from '../../models/Redflag';
import { Otteruser } from '../../models/Otteruser';
import { Sequelize } from 'sequelize';
/**
 * You can give red flags/cards to people
 */
export default class OtterHighscoreCommand extends Command {
  constructor() {
    super(
      'highscore',
      ['highscores', 'scoreboard', 'scores', 'score', 'ranks'],
      'Shows the top 10 users with most redflags.',
      `${process.env.PREFIX}highscore`,
      true
    );
  }

  async execute(msg: Discord.Message) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    // get all normal redflags from each user
    const highscore: any = await Redflag.findAll({
      group: ['user_id'],
      order: [[Sequelize.literal('flags'), 'DESC']],
      attributes: [
        'user_id',
        [
          Sequelize.literal(
            `SUM(CASE WHEN double_red = 0 THEN 1 WHEN double_red = 1 THEN 2 END)`
          ),
          'flags'
        ]
      ],
      include: [
        {
          model: Otteruser,
          as: 'receiver',
          attributes: ['discord_tag']
        }
      ],
      limit: 10
    });

    // create message
    let highscoreString: string = '';
    for (let i: number = 0; i < highscore.length; i++) {
      highscoreString += `\n**${i + 1}.** Otter: **${
        highscore[i].dataValues.receiver.discord_tag
      }** - Flags: **${highscore[i].dataValues.flags}**`;
    }

    const rodeKaart: Discord.GuildEmoji = emojiLookup.get('rode_kaart');

    // create embed message
    const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
      .setColor('#0088ff')
      .setTitle(`Highscore Redflag ${emojiLookup.getString(rodeKaart)}`)
      .setTimestamp()
      .setFooter({ text: 'Top 10 Anime Battles' });

    embed.setDescription(highscoreString);
    msg.channel.send({ embeds: [embed] });
    emojiLookup.react(msg, rodeKaart);
  }
}
