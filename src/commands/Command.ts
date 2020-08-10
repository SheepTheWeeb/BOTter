/**
 * Command class
 */
export default class Command {
  name: string;
  alias: Array<string>;
  description: string;
  usage: string;
  enabled: boolean;

  constructor(
    name: string = 'No name set.',
    alias: Array<string> = [],
    description: string = 'No description set.',
    usage: string = 'No usage set.',
    enabled: boolean = false
  ) {
    this.name = name;
    this.alias = alias;
    this.description = description;
    this.usage = usage;
    this.enabled = enabled;
  }

  public execute(msg: any, args: Array<string>): void {
    throw new Error('command not implemented.');
  }
}
