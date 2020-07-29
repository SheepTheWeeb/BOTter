const Command = require('./../Command');
const {sequelize, redflag, user} = require('./../../models');

/**
 * You can give red flags/cards to people
 */
class OtterRankCommand extends Command {

  constructor() {
    super("rank", ["HOEVEELSTE_STA_IK"], "Shows your rank in the redflag highscores.", 
      process.env.PREFIX + "rank", true)
  }

  async execute(msg, args) {
    try {
      var intendedUserId;
      var messagePart;

      //check if there are arguments
      if(args.length !== 0) {
        //grab first argument
        const taggedUser = args[0];
        
        //check if it is a user
        if(!/^<@(!)?[0-9]+>$/i.test(taggedUser)) {
          msg.reply("In order to give a 'rode kaart', you need to tag a user first.");
          return;
        }

        //get mentioned user
        const mentionedUser = msg.mentions.users.first()
        if(!mentionedUser) {
          msg.reply("In order to give a 'rode kaart', you need to tag a valid user.");
          return;
        }

        intendedUserId = mentionedUser.id;
        messagePart = 'deze otter';

      } else {
        intendedUserId = msg.author.id;
        messagePart = 'je';
      }

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
          attributes: ['discord_id'],
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
          attributes: ['discord_id'],
        }],
      });

      //create an array with the data from normal flags
      var highscore = [];
      normalFlags.forEach(flag => {
        highscore.push({
          id: flag.dataValues.user_id,
          discord_id: flag.dataValues.receiver.discord_id,
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
            discord_id: flag.dataValues.receiver.discord_id,
            flags: (flag.dataValues.flags * 2),
          });
        }
      });

      //sort
      highscore.sort((a,b) => {
        return b.flags - a.flags;
      });

      //get the rank
      var otterRank;
      for(var i = 0; i < highscore.length; i++) {
        if(highscore[i].discord_id === intendedUserId) {
          otterRank = i +1;
          break;
        }
      }
      
      if (otterRank) {
        msg.reply(`${messagePart} staat **rank ${otterRank}**. ${emojiLookup.get("otter_shocked")}`);
        msg.react(emojiLookup.get("rilakkuma_otter"));
      } else {
        msg.reply(`${messagePart} staat nog niet in de highscores.`);
      }

    } catch(ex) {
      console.log(ex.message)
    }
  }
}

module.exports = OtterRankCommand;
