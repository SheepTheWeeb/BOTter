/**
 * Command class
 */
class Command {
  name: string;
  alias: Array<string>;
  description: string;
  usage: string;
  enabled: boolean;

  constructor(
    name = 'No name set.',
    alias = [],
    description = 'No description set.',
    usage = 'No usage set.',
    enabled = false
  ) {
    this.name = name;
    this.alias = alias;
    this.description = description;
    this.usage = usage;
    this.enabled = enabled;
  }
}

// export class
export default Command;
