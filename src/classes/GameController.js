import Clue from "./Clue";


export default class GameController {
    constructor(){
        this.clueCount = 0;
        this.progressionPercentage = 0;
        this.gameComplete = false;
    }

    get gameComplete(){
        return this.gameComplete;
    }

    get progressionPercentage(){
        return this.progressionPercentage;
    }

   set progressionPercentage(value){
    this._progressionPercentage = value;
   }
   
   set gameComplete(value){
    this._gameComplete = value;
   }

    increaseClueCount(clue){
        if(clue instanceof Clue && !clue.isFound){
            this.clueCount += 1;
            clue.isFound = true;
        }else if(clue.isFound && clue instanceof Clue){
            console.error("Duplicate error: This clue has already been found once.");
        }else{
            console.error("Invalid clue: Given parameter is not a Clue.");
        }
        
        return this.clueCount;
    }

    CompleteGame(){
        this.gameComplete = true;
    }
}
