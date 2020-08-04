const Discord = require('discord.js');
const Command = require('../Command');
const { sequelize, redflag, user } = require('../../models');

/**
 * You can give red flags/cards to people
 */
class OtterHighscoreCommand extends Command {
  constructor() {
    super(
      'highscore',
      ['highscores', 'scoreboard', 'scores', 'score', 'ranks'],
      'Shows the top 10 users with most redflags.',
      `${process.env.PREFIX}highscore`,
      true
    );
  }

  async execute(msg) {
    // check if command is enabled
    if (!this.enabled) {
      logger.error(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    // get all normal redflags from each user
    const highscore = await redflag.findAll({
      group: ['user_id'],
      order: [[sequelize.literal('flags'), 'DESC']],
      attributes: [
        'user_id',
        [
          sequelize.literal(
            `SUM(CASE WHEN double_red = 0 THEN 1 WHEN double_red = 1 THEN 2 END)`
          ),
          'flags'
        ]
      ],
      include: [
        {
          model: user,
          as: 'receiver',
          attributes: ['discord_tag']
        }
      ],
      limit: 10
    });

    // create message
    let highscoreString = '';
    for (let i = 0; i < highscore.length; i++) {
      highscoreString += `\n**${i + 1}.** Otter: **${
        highscore[i].dataValues.receiver.discord_tag
      }** - Flags: **${highscore[i].dataValues.flags}**`;
    }

    // create embed message
    const embed = new Discord.MessageEmbed()
      .setColor('#0088ff')
      .setTitle(`Highscore Redflag ${emojiLookup.get('rode_kaart')}`)
      .setTimestamp()
      .setFooter('Top 10 Anime Battles');

    embed.setDescription(highscoreString);
    msg.channel.send(embed);
    msg.react(emojiLookup.get('rode_kaart'));
  }
}

module.exports = OtterHighscoreCommand;
