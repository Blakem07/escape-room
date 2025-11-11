/**
 * Represents the final puzzle lock in the game, the user will collect 
 * all the clues to create the final combination for the lock.
 * 
 * @example
 * // Create a new Lock
 * const lock = new Lock(1234, "Combination Lock"); 
 * console.log(lock.isSolved); - false
 * 
 * // Check combination
 * lock.checkSolution(4444); - "Wrong combination."
 * console.log(lock.isSolved); - false
 * lock.checkSolution(1234); - "Lock unlocked!"
 * console.log(lock.isSolved); - true 
 * 
 */

export default class Lock{
    /**
     * Creates a lock
     * @param {number} solution - Solution of the lock.
     * @param {string} inputType - Description of what type of lock it is.
     */
    constructor(solution, inputType){
        this.solution = solution;
        this.isSolved = false;
        this.inputType = inputType;
    }

get solution(){
    return this._solution;
}

set solution(newSolution){
    if(typeof newSolution === "number" && newSolution > 0){
        this._solution = newSolution;
    } else{
        console.error("Invalid Solution: Solution must be a positive number.");
    }
}

get isSolved(){
    return this._isSolved;
}

set isSolved(solved){
    if(typeof solved === "boolean"){
        this._isSolved = solved;
    }else{
        console.error("Invalid isSolved: isSolved must be a boolean.")
    }
}

get inputType(){
    return this._inputType;
}

set inputType(newType){
    if(typeof newType==="string" && newType.trim() !==""){
        this._inputType = newType;
    }else{
        console.error("Invalid inputType: inputType must be a non-empty string.");
    }
}

/**
 * Checks the user input matches with the lock solution.
 * 
 * @param {number} userInput - The combination sent by user.
 * @returns {boolean} - True if solution is correct, false if not.
 * 
 * @example
 * // Incorrect attempt
 * lock.checkSolution(userInput); // "Wrong combination."
 * console.log(lock.isSolved); // false
 *
 * // Correct attempt 
 * lock.checkSolution(userInput); // "Lock unlocked!"
 * console.log(lock.isSolved); // true 
 * 
 * 
 */
checkSolution(userInput){
    if (userInput === this.solution){
        this.isSolved = true;
        console.log("Lock unlocked!");
        return true;
    }else{
        console.log("Wrong combination.");
        return false;
    }
}}