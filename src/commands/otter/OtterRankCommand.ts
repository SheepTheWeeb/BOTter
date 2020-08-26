import Command from '../Command';
import Discord from 'discord.js';
import { emojiLookup } from './../../app';
import { Sequelize } from 'sequelize';
import { Redflag } from '../../models/Redflag';
import { Otteruser } from '../../models/Otteruser';

/**
 * You can give red flags/cards to people
 */
export default class OtterRankCommand extends Command {
  constructor() {
    super(
      'rank',
      ['HOEVEELSTE_STA_IK'],
      'Shows your rank in the redflag highscores.',
      `${process.env.PREFIX}rank`,
      true
    );
  }

  async execute(msg: Discord.Message, args: Array<string>) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    let intendedUserId: string;
    let messagePart: string;

    // check if there are arguments
    if (args.length !== 0) {
      // grab first argument
      const taggedUser: string = args[0];

      // check if it is a user
      if (!/^<@(!)?[0-9]+>$/i.test(taggedUser)) {
        msg.reply(
          "In order to give a 'rode kaart', you need to tag a user first."
        );
        return;
      }

      // get mentioned user
      const mentionedUser:
        | Discord.User
        | undefined = msg.mentions.users.first();
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
          attributes: ['discord_id']
        }
      ]
    });

    // get the rank
    let otterRank: number | undefined;
    for (let i = 0; i < highscore.length; i++) {
      if (highscore[i].dataValues.receiver.discord_id === intendedUserId) {
        otterRank = i + 1;
        break;
      }
    }

    if (otterRank) {
      msg.reply(
        `${messagePart} staat **rank ${otterRank}**. ${emojiLookup.getStringByName(
          'otter_shocked'
        )}`
      );
      emojiLookup.react(msg, emojiLookup.get('rilakkuma_otter'));
    } else {
      msg.reply(`${messagePart} staat nog niet in de highscores.`);
    }
  }
}
