export default class Lock{
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