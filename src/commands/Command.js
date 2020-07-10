/**
 * Command class
 */
class Command {

  /**
   * Constructor
   */
  constructor(
    name = "No name set.",
    alias = [],
    description = "No description set.",
    usage = "No usage set.",
    enabled = false
  ) {
    
    this.name = name,
    this.alias = alias,
    this.description = description,
    this.usage = usage,
    this.enabled = enabled
  }

  /**
   * quick test if the abstractness works
   */
  testAbstract() {
    return "testAbstract() doet het.";
  }

}

//export class
module.exports = Command;
