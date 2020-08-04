const Command = require('../Command');
const { sequelize, redflag, user } = require('../../models');

/**
 * You can give red flags/cards to people
 */
class OtterRankCommand extends Command {
  constructor() {
    super(
      'rank',
      ['HOEVEELSTE_STA_IK'],
      'Shows your rank in the redflag highscores.',
      `${process.env.PREFIX}rank`,
      true
    );
  }

  async execute(msg, args) {
    // check if command is enabled
    if (!this.enabled) {
      logger.error(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    let intendedUserId;
    let messagePart;

    // check if there are arguments
    if (args.length !== 0) {
      // grab first argument
      const taggedUser = args[0];

      // check if it is a user
      if (!/^<@(!)?[0-9]+>$/i.test(taggedUser)) {
        msg.reply(
          "In order to give a 'rode kaart', you need to tag a user first."
        );
        return;
      }

      // get mentioned user
      const mentionedUser = msg.mentions.users.first();
      if (!mentionedUser) {
        msg.reply(
          "In order to give a 'rode kaart', you need to tag a valid user."
        );
        return;
      }

      intendedUserId = mentionedUser.id;
      messagePart = 'deze otter';
    } else {
      intendedUserId = msg.author.id;
      messagePart = 'je';
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
          attributes: ['discord_id']
        }
      ]
    });

    // get the rank
    let otterRank;
    for (let i = 0; i < highscore.length; i++) {
      if (highscore[i].dataValues.receiver.discord_id === intendedUserId) {
        otterRank = i + 1;
        break;
      }
    }

    if (otterRank) {
      msg.reply(
        `${messagePart} staat **rank ${otterRank}**. ${emojiLookup.get(
          'otter_shocked'
        )}`
      );
      msg.react(emojiLookup.get('rilakkuma_otter'));
    } else {
      msg.reply(`${messagePart} staat nog niet in de highscores.`);
    }
  }
}

module.exports = OtterRankCommand;
