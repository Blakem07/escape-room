import Clue from "./Clue";
import Lock from "./lock";
import UI from "./UI";
import ModalComponent from "../components/ModalComponent";

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
    clue1 = new Clue(
      "default clue 1",
      "default clue if no parameter is given",
      "1"
    ),
    clue2 = new Clue(
      "default clue 2",
      "default clue if no parameter is given",
      "2"
    ),
    clue3 = new Clue(
      "default clue 3",
      "default clue if no parameter is given",
      "3"
    ),
    clue4 = new Clue(
      "default clue 4",
      "default clue if no parameter is given",
      "4"
    ),
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
      this._clue1 = new Clue(
        "default clue 1",
        "default clue if no parameter is given"
      );
      this._clue2 = new Clue(
        "default clue 2",
        "default clue if no parameter is given"
      );
      this._clue3 = new Clue(
        "default clue 3",
        "default clue if no parameter is given"
      );
      this._clue4 = new Clue(
        "default clue 4",
        "default clue if no parameter is given"
      );
      this._lock = new Lock(1111, "number lock");
    }
    this._clues = [this._clue1, this._clue2, this._clue3, this._clue4];
    this._currentLockInput = "";
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
  getCodeString(){
    let result = "";
    this._clues.forEach(clue => {
      if(clue.isFound && (clue.code || clue.code === 0) && (String(clue.code).length == 1)){
        result += clue.code;
      }else if(!clue.isFound && clue.code){
        result += "_";
      }else{
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
    increaseClueCount(clue){
        if(clue instanceof Clue && !clue.isFound){
            clue.discover();
            this.clueCount += 1;
        }else if(clue instanceof Clue && clue.isFound ){
            return;
        }else{
            console.error("Invalid clue: Given parameter is not a Clue.");
        }
        
        return this.clueCount;
    }

  /**
   * Mark the game as complete and displays a popup to congratulate the player.
   *
   * @returns {void}
   */
  completeGame() {
    this._gameComplete = true;
    
    const userInterface = new UI();
    const documentBody = document.body;

    //Game completion popup
    const completeModal = new ModalComponent("Congratulations!", "You've unlocked the door and escaped the room");

    const completePopup = userInterface.createPopup({
      content: () => completeModal.render(),
      overlay: () => userInterface.createBlurOverlay(),
      closeCallBack: () => {
        //reloads the page after the close button is pressed in order to restart the game
        window.location.reload();
        return;
      },
    });
  
    documentBody.appendChild(completePopup);
  }

  /**
   * Gets input from the UI class' click events to set clues as found
   *
   * @returns {void}
   */
  getInput(selector) {
    switch(selector){
      case ".Clue1":
        this.increaseClueCount(this._clue1);
        break;
      case ".Clue2":
        this.increaseClueCount(this._clue2);
        break;
      case ".Clue3":
        this.increaseClueCount(this._clue3);
        break;
      case ".Clue4":
        this.increaseClueCount(this._clue4);
        break;
    }
  }

  /**
   * Function called by LockComponents when the enter button on the keypad is pressed.
   * Compares the current input value to the lock's solution and calls completeGame if they match.
   *
   * @returns {void}
   */
  lockEnter(){
    if(this._lock.checkSolution(parseInt(this._currentLockInput))){
      this.completeGame();
    }
  }

  /**
   * Function called by LockComponents when the clear button on the keypad is pressed.
   * clears the current input value so new digits can be added.
   *
   * @returns {void}
   */
  lockClear(){
    this._currentLockInput = "";
  }

  /**
   * Function called by LockComponents when any number button on the keypad is pressed.
   * Appends the pressed digit to the current input value property of this class
   *
   * @returns {void}
   */
  lockInput(digit){
    if(!this._currentLockInput){
      this._currentLockInput = digit.toString();
    }else if(this._currentLockInput.length < 4){
      this._currentLockInput = this._currentLockInput + digit.toString();
    }else{
      return;
    }
  }
}
