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
}
