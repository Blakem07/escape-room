import Clue from "./Clue";
import Lock from "./lock";

/**
 * Controls the escape-room game state: tracking found clues, progression
 * percentage, and game completion.
 *
 * @class GameController
 */
export default class GameController {
    constructor(
        clue1 = new Clue("default clue 1", "default clue if no parameter is given"), 
        clue2 = new Clue("default clue 2", "default clue if no parameter is given"), 
        clue3 = new Clue("default clue 3", "default clue if no parameter is given"), 
        lock = new Lock(1111, "number lock")
    ){
        this.clueCount = 0;
        this._progressionPercentage = 0;
        this._gameComplete = false;
        if(clue1 instanceof Clue && clue2 instanceof Clue && clue3 instanceof Clue && lock instanceof Lock){
            this._clue1 = clue1;
            this._clue2 = clue2;
            this._clue3 = clue3;
            this._lock = lock;
        }else{
            console.error("Parameter error: passed clues or locks are not instances of the clue or lock class.");
            //set clues and locks to default
            this._clue1 = new Clue("default clue 1", "default clue if no parameter is given");
            this._clue2 = new Clue("default clue 2", "default clue if no parameter is given");
            this._clue3 = new Clue("default clue 3", "default clue if no parameter is given");
            this._lock = new Lock(111, "number lock");
        }
        this._clues = [this._clue1, this._clue2, this._clue3];
        
    }

    get gameComplete(){
        return this._gameComplete;
    }

    get progressionPercentage(){
        return this._progressionPercentage;
    }

    get clues(){
        return this._clues;
    }

    get lock(){
        return this._lock;
    }

   set progressionPercentage(value){
    this._progressionPercentage = value;
   }
   
   set gameComplete(value){
    this._gameComplete = value;
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
            this.clueCount += 1;
            clue.isFound = true;
        }else if(clue instanceof Clue && clue.isFound ){
            console.error("Duplicate error: This clue has already been found once.");
        }else{
            console.error("Invalid clue: Given parameter is not a Clue.");
        }
        
        return this.clueCount;
    }

    /**
     * Mark the game as complete.
     * 
     * @returns {void}
     */
    completeGame(){
        console.log("completeGame called");
        this._gameComplete = true;
    }

    getInput(){
        return 0;
    }

    /**
     * Main game loop that processes player actions until the game is complete.
     * 
     * 
     * @returns {void}
     */
    async playGame(){

        while(!this.gameComplete){
            //for now lets assume we get input as an array containing: {clue/lock, cluename/locksolution}
            let input = await this.getInput();
            let foundClueIndex;
            if(Array.isArray(input) && input.at(0) === "clue"){
                this.clues.forEach((clue, i) => {
                    if(input.at(1) === clue.name){
                        foundClueIndex = i;
                    }
                })
                this.increaseClueCount(this.clues.at(foundClueIndex));
            }else if(Array.isArray(input) && input.at(0) === "lock"){
                console.log("array + lock");
                if(this.lock.checkSolution(input.at(1))){
                    this.completeGame();
                }
            }
        }
    }
}
