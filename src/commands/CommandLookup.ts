import Command from './Command';
import PingCommand from './misc/PingCommand';
import PannekoekCommand from './misc/PannekoekCommand';
import OtterPicCommand from './otter/OtterPicCommand';
import OtterFactCommand from './otter/OtterFactCommand';
import OtterRoodCommand from './otter/OtterRoodCommand';
import OtterDubbelRoodCommand from './otter/OtterDubbelRoodCommand';
import OtterKaartenCommand from './otter/OtterKaartenCommand';
import OtterTotaalKaartenCommand from './otter/OtterTotaalKaartenCommand';
import HelpCommand from './misc/HelpCommand';
import UptimeCommand from './misc/UptimeCommand';
import OtterHighscoreCommand from './otter/OtterHighscoreCommand';
import OtterRankCommand from './otter/OtterRankCommand';
import DruifCommand from './misc/DruifCommand';
import OkCommand from './misc/OkCommand';

export default class CommandLookup {
  commands: Array<Command>;

  constructor() {
    const commands = {
      PingCommand: new PingCommand(),
      PannekoekCommand: new PannekoekCommand(),
      DruifCommand: new DruifCommand(),
      HelpCommand: new HelpCommand(),
      UptimeCommand: new UptimeCommand(),
      OkCommand: new OkCommand(),
      OtterPicCommand: new OtterPicCommand(),
      OtterFactCommand: new OtterFactCommand(),
      OtterRoodCommand: new OtterRoodCommand(),
      OtterDubbelRoodCommand: new OtterDubbelRoodCommand(),
      OtterKaartenCommand: new OtterKaartenCommand(),
      OtterTotaalKaartenCommand: new OtterTotaalKaartenCommand(),
      OtterHighscoreCommand: new OtterHighscoreCommand(),
      OtterRankCommand: new OtterRankCommand()
    };

    this.commands = this.loadCommands(commands);
  }

  private loadCommands(commands: any): Array<Command> {
    let tempCommands: Array<Command> = [];

    Object.keys(commands).forEach((e) => {
      tempCommands.push(commands[e]);
    });

    return tempCommands;
  }

  public get(commandName: string): Command | null {
    let command: Command | null = null;

    // exists is a function from commandLookup
    if (!this.exists(commandName)) {
      return command;
    }

    //look through command names
    for (let i: number = 0; i < this.commands.length; i++) {
      if (commandName === this.commands[i].name && this.commands[i].enabled) {
        command = this.commands[i];
        break;
      }
    }

    if (command === null) {
      //look through command aliasses
      for (let i: number = 0; i < this.commands.length; i++) {
        if (!this.commands[i].enabled) {
          continue;
        }

        for (let j: number = 0; j < this.commands[i].alias.length; j++) {
          if (commandName === this.commands[i].alias[j]) {
            command = this.commands[i];
            break;
          }
        }

        if (command !== null) {
          break;
        }
      }
    }

    return command;
  }

  public exists(commandName: string): boolean {
    let found: boolean = false;

    //look through command names
    for (let i: number = 0; i < this.commands.length; i++) {
      if (commandName === this.commands[i].name) {
        found = true;
        break;
      }
    }

    if (found) {
      return found;
    }

    //look through command aliasses
    for (let i: number = 0; i < this.commands.length; i++) {
      for (let j: number = 0; j < this.commands[i].alias.length; j++) {
        if (commandName === this.commands[i].alias[j]) {
          found = true;
          break;
        }
      }

      if (found) {
        break;
      }
    }

    return found;
  }
}
