/**
 * class used to lookup emojis from servers
 */
export default class EmojiLookup {
  client: any;
  emojis: Array<any>;

  constructor(client: any) {
    this.client = client;

    let emojis: Array<any> = [];
    client.guilds.cache.forEach((guild: any) => {
      guild.emojis.cache.forEach((emoji: any) => {
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
  public get(emojiName: string): any | null {
    return this.emojis.find((emoji) => emoji.name === emojiName);
  }
}
