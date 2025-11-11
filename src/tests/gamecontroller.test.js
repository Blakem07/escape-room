import GameController from "../classes/GameController";
import Clue from "../classes/Clue";

describe("GameController class tests", () => {

    let gamecontroller;
    let clue;

    beforeEach(() => {
        gamecontroller = new GameController();
        clue = new Clue("clue 1", "test clue");
        jest.spyOn(console, "error").mockImplementation(() => {});
      });
    
      afterEach(() => {
        jest.restoreAllMocks();
      });

    test("GameController.increaseClueCount() should only increase the count if isFound is false", () => {
        gamecontroller.increaseClueCount(clue);
        //check if it properly incremented clueCount
        expect(gamecontroller.clueCount).toBe(1);
        gamecontroller.increaseClueCount(clue);
        //check if error has been thrown for duplicate clue
        expect(console.error).toHaveBeenCalledWith("Duplicate error: This clue has already been found once.");
    });

    test("GameController.increaseClueCount() should only increase the count if the given parameter is a clue", () => {
        gamecontroller.increaseClueCount(1);
        expect(console.error).toHaveBeenCalledWith("Invalid clue: Given parameter is not a Clue.");
        //check if it left the clueCount as is
        expect(gamecontroller.clueCount).toBe(0);
    });

});