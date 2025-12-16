import Clue from "./Clue";
import Lock from "./Lock";

/**
 * Controls the escape-room game state: tracking found clues, progression
 * percentage, and game completion.
 *
 * @class GameController
 *
 * @param {Clue} clue1 - first clue
 * @param {Clue} clue2 - second clue
 * @param {Clue} clue3 - third clue
 * @param {Clue} clue4 - fourth clue
 * @param {Lock} lock - lock instance containing the solution to the puzzle
 */
export default class GameController {
  constructor(
    clue1 = new Clue("default clue 1", "default clue if no parameter is given", "1"),
    clue2 = new Clue("default clue 2", "default clue if no parameter is given", "2"),
    clue3 = new Clue("default clue 3", "default clue if no parameter is given", "3"),
    clue4 = new Clue("default clue 4", "default clue if no parameter is given", "4"),
    lock = new Lock(1111, "number lock")
  ) {
    this.clueCount = 0;
    this._progressionPercentage = 0;
    this._gameComplete = false;
    if (
      clue1 instanceof Clue &&
      clue2 instanceof Clue &&
      clue3 instanceof Clue &&
      clue4 instanceof Clue &&
      lock instanceof Lock
    ) {
      this._clue1 = clue1;
      this._clue2 = clue2;
      this._clue3 = clue3;
      this._clue4 = clue4;
      this._lock = lock;
    } else {
      console.error(
        "Parameter error: passed clues or locks are not instances of the clue or lock class."
      );
      //set clues and locks to default
      this._clue1 = new Clue("default clue 1", "default clue if no parameter is given");
      this._clue2 = new Clue("default clue 2", "default clue if no parameter is given");
      this._clue3 = new Clue("default clue 3", "default clue if no parameter is given");
      this._clue4 = new Clue("default clue 4", "default clue if no parameter is given");
      this._lock = new Lock(1111, "number lock");
    }
    this._clues = [this._clue1, this._clue2, this._clue3, this._clue4];
  }

  get gameComplete() {
    return this._gameComplete;
  }

  get progressionPercentage() {
    return this._progressionPercentage;
  }

  get clues() {
    return this._clues;
  }

  get lock() {
    return this._lock;
  }

  set progressionPercentage(value) {
    this._progressionPercentage = value;
  }

  set gameComplete(value) {
    this._gameComplete = value;
  }

  /**
   * returns a string displaying which clues have been
   * found by displaying its code property in a string
   *
   * @returns {string} The code with unfound clues obscured
   */
  getCodeString() {
    let result = "";
    this._clues.forEach((clue) => {
      if (clue.isFound && (clue.code || clue.code === 0) && String(clue.code).length == 1) {
        result += clue.code;
      } else if (!clue.isFound && clue.code) {
        result += "_";
      } else {
        console.error("clue does not have a valid code");
        result += "_";
      }
    });
    return result;
  }

  /**
   * Attempt to mark a Clue as found and increase the clue count
   * - If a valid, unfound Clue is provided, increments and marks it found
   * - If a Clue is provided but already found, logs a "duplicate error"
   * - Otherwise logs an "invalid clue" error
   *
   * @param {Clue|any} clue - Clue instance to mark as found
   * @returns {number} The updated clue count
   */
  increaseClueCount(clue) {
    if (clue instanceof Clue && !clue.isFound) {
      clue.discover();
      this.clueCount += 1;
    } else if (clue instanceof Clue && clue.isFound) {
      console.error("Duplicate error: This clue has already been found once.");
    } else {
      console.error("Invalid clue: Given parameter is not a Clue.");
    }

    return this.clueCount;
  }

  /**
   * Mark the game as complete.
   *
   * @returns {void}
   */
  completeGame() {
    this._gameComplete = true;
  }

  getInput() {
    return 0;
  }

  /**
   * Main game loop that processes player actions until the game is complete.
   *
   *
   * @returns {void}
   */
  async playGame() {
    while (!this.gameComplete) {
      //for now lets assume we get input as an array containing: {clue/lock, cluename/locksolution}
      let input = await this.getInput();
      if (this.lock.checkSolution(input)) {
        this.completeGame();
      }
    }
  }
}
