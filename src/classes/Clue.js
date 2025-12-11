/**
 * Represents a clue in the game.
 *
 * A Clue has:
 *  - a name
 *  - descriptive information shown to the player
 *  - a code value (e.g a digit or character revealed by the clue)
 *  - a state indicating whether it has been discovered
 *
 * @example
 * const clue = new Clue("Handwritten Note", "The first number on the lock is 1", "1");
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
   * @param {string | number} code - The code associated with the clue - converted to string internally.
   */
  constructor(name, information, code) {
    this.name = name;
    this.information = information;
    this.code = code;
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

  set code(newCode) {
    if (newCode === null || newCode === undefined) {
      console.error("Invalid code: value must not be null or undefined.");
      return;
    }
    const str = String(newCode).trim();

    if (!str) {
      console.error("Invalid code: must be a non-empty string or number.");
      return;
    }

    this._code = str;
  }

  get code() {
    return this._code;
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
