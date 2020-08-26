import Discord from 'discord.js';

/**
 * class used to lookup emojis from servers
 */
export default class EmojiLookup {
  client: Discord.Client;
  emojis: Array<Discord.GuildEmoji>;

  constructor(client: Discord.Client) {
    this.client = client;
    this.emojis = [];
  }

  public init() {
    let emojis: Array<Discord.GuildEmoji> = [];
    this.client.guilds.cache.forEach((guild: Discord.Guild) => {
      guild.emojis.cache.forEach((emoji: Discord.GuildEmoji) => {
        emojis.push(emoji);
      });
    });

    this.emojis = emojis;
  }

  /**
   * Gets an emoji from all the servers the bot is in
   *
   * @param emojiName name of the emoji you want to look up
   */
  public get(emojiName: string): Discord.GuildEmoji {
    return this.emojis.find((emoji) => emoji.name === emojiName)!;
  }

  /**
   * Get emojiString by the emoji
   *
   * @param emoji the emoji you want the string from
   */
  public getString(emoji: Discord.GuildEmoji): Discord.GuildEmoji | string {
    const emojiString: Discord.GuildEmoji | string = emoji ? emoji : '';
    return emojiString;
  }

  /**
   * Get emojiString by the emojiName
   *
   * @param emojiName name of the emoji
   */
  public getStringByName(emojiName: string): Discord.GuildEmoji | string {
    const emoji = this.get(emojiName);
    return this.getString(emoji);
  }

  /**
   * react with an emoji
   *
   * @param msg message to react to
   * @param emoji the emoji you want to react with
   */
  public react(msg: Discord.Message, emoji: Discord.GuildEmoji): void {
    try {
      msg.react(emoji);
    } catch (ex) {
      console.log('Could not find the emoji to react on the message.');
    }
  }
}
