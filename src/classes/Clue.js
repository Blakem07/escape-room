/**
 * Represents a clue in the game.
 *
 * A Clue has a name, descriptive information, and a state indicating whether
 * it has been discovered. This class encapsulates the data and behavior
 * associated with a clue, including marking it as found.
 *
 * @example
 * const clue = new Clue("Handwritten Note", "The first number on the lock is 1");
 * console.log(clue.isFound); // false
 * clue.discover();
 * console.log(clue.isFound); // true
 *
 * @class
 */
export default class Clue {
  /**
   * Creates a new Clue.
   * @param {string} name - The name of the clue.
   * @param {string} information - Descriptive information about the clue.
   */
  constructor(name, information) {
    this.name = name;
    this.information = information;
    this.isFound = false;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    if (typeof newName === "string" && newName.trim() !== "") {
      this._name = newName;
    } else {
      console.error("Invalid name: Name must be a non-empty string.");
    }
  }

  get information() {
    return this._information;
  }

  set information(newInformation) {
    if (typeof newInformation === "string" && newInformation.trim() !== "") {
      this._information = newInformation;
    } else {
      console.error(
        "Invalid information: Information must be a non-empty string."
      );
    }
  }

  get isFound() {
    return this._isFound;
  }

  set isFound(found) {
    if (typeof found === "boolean") {
      this._isFound = found;
    } else {
      console.error("Invalid isFound: isFound must be a boolean.");
    }
  }

  /**
   * Marks the clue as discovered.
   *
   * Sets isFound to true, if the clue has not been found.
   * 
   * @returns {void}
   */
  discover() {
    if (!this.isFound) {
      this.isFound = true;
      console.log(`Clue "${this.name}" discovered!`);
    }
  }
}
