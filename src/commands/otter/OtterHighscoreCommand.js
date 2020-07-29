const Command = require('./../Command');
const Discord = require('discord.js');
const {sequelize, redflag, user} = require('./../../models');

/**
 * You can give red flags/cards to people
 */
class OtterHighscoreCommand extends Command {

  constructor() {
    super("highscore", ["highscores", "scoreboard", "scores", "score", "ranks"], "Shows the top 10 users with most redflags.", 
      process.env.PREFIX + "highscore", true)
  }

  async execute(msg, args) {
    try {
      //get all normal redflags from each user
      let normalFlags = await redflag.findAll({
        where: {
          double_red: false,
        },
        group: ['user_id'],
        attributes: ['user_id', [sequelize.fn('COUNT', 'user_id'), 'flags']],
        include: [{
          model: user,
          as: 'receiver',
          attributes: ['discord_tag'],
        }],
      });

      //get all double redflags from each user
      let doubleFlags = await await redflag.findAll({
        where: {
          double_red: true,
        },
        group: ['user_id'],
        attributes: ['user_id', [sequelize.fn('COUNT', 'user_id'), 'flags']],
        include: [{
          model: user,
          as: 'receiver',
          attributes: ['discord_tag'],
        }],
      });

      //create an array with the data from normal flags
      var highscore = [];
      normalFlags.forEach(flag => {
        highscore.push({
          id: flag.dataValues.user_id,
          discord_name: flag.dataValues.receiver.discord_tag,
          flags: flag.dataValues.flags,
        });
      });

      //merge the normal and double flags
      doubleFlags.forEach(flag => {
        let exist = false;
        for(var i = 0; i < highscore.length; i++) {
          if(highscore[i].id === flag.dataValues.user_id) {
            exist = true;
            highscore[i].flags += (flag.dataValues.flags * 2);
          }

        }

        if(!exist) {
          highscore.push({
            id: flag.dataValues.user_id,
            discord_name: flag.dataValues.receiver.discord_tag,
            flags: (flag.dataValues.flags * 2),
          });
        }
      });

      //sort
      highscore.sort((a,b) => {
        return b.flags - a.flags;
      });

      //grab top 10
      highscore = highscore.slice(0, 10)

      var highscoreString = '';
      for(var i = 0; i < highscore.length; i++) {
        highscoreString += `\n**${i+1}.** Otter: **${highscore[i].discord_name}** - Flags: **${highscore[i].flags}**`;
      }

      //create embed message
      const embed = new Discord.MessageEmbed()
        .setColor('#0088ff')
        .setTitle(`Highscore Redflag ${emojiLookup.get("rode_kaart")}`)
        .setTimestamp()
        .setFooter('Top 10 Anime Battles');

      embed.setDescription(highscoreString)
      msg.channel.send(embed);
      msg.react(emojiLookup.get("rode_kaart"));

    } catch(ex) {
      console.log(ex.message)
    }
  }
}

module.exports = OtterHighscoreCommand;
