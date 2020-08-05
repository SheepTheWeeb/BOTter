declare module NodeJS {
  interface Global {
    logger: any;
    insightsClient: any;
    emojiLookup: any;
    commandLookup: any;
  }
}
