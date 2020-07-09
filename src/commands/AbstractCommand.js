/**
 * Abstract Command class
 */
class AbstractCommand {

  /**
   * Constructor
   */
  constructor() {
    //return error when you try to initiate an abstract class.
    if(this.constructor === AbstractCommand) {
      throw new Error("Can't instantiate abstract class!");
    }
  }

  /**
   * What gets executed if the command is called
   * 
   * @param {*} msg Message that executed this command
   * @param {*} arguments Command arguments
   */
  execute(msg, arguments) {
    throw new Error("Abstract method!");
  }

  /**
   * quick test if the abstractness works
   */
  testAbstract() {
    return "testAbstract() doet het.";
  }

}

//export class
module.exports = AbstractCommand;
