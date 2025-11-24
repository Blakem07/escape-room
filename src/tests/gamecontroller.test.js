import GameController from "../classes/GameController";
import Clue from "../classes/Clue";
import Lock from "../classes/lock";

describe("GameController class tests", () => {
  let gamecontroller;
  let clue1;
  let clue2;
  let clue3;
  let lock;

    beforeEach(() => {
        clue1 = new Clue("clue 1", "test clue");
        clue2 = new Clue("clue 2", "test clue");
        clue3 = new Clue("clue 3", "test clue");
        clue4 = new Clue("clue 4", "test clue");
        lock = new Lock(1234, "combination lock");
        gamecontroller = new GameController(clue1, clue2, clue3, clue4, lock);
        jest.spyOn(console, "error").mockImplementation(() => {});
      });
    
      afterEach(() => {
        jest.restoreAllMocks();
      });

    test("GameController only lets you initialise it if given clues and a lock or uses default parameters", () => {
      let testController = new GameController(1, "something", 3, 4, "test input");
      expect(testController.clues.at(0).name).toBe("default clue 1");
      expect(testController.lock.solution).toBe(1111);

      testController = new GameController(clue1, clue2, clue3, clue4, lock);
      expect(testController.clues.at(0).name).toBe("clue 1");
      expect(testController.lock.solution).toBe(1234);
    });

    test("GameController.increaseClueCount() should only increase the count if isFound is false", () => {

        gamecontroller.increaseClueCount(clue1);
        //check if it properly incremented clueCount
        expect(gamecontroller.clueCount).toBe(1);
        gamecontroller.increaseClueCount(clue1);
        //check if error has been thrown for duplicate clue
        expect(console.error).toHaveBeenCalledWith("Duplicate error: This clue has already been found once.");
    });

  test("GameController.increaseClueCount() should only increase the count if the given parameter is a clue", () => {
    gamecontroller.increaseClueCount(1);
    expect(console.error).toHaveBeenCalledWith(
      "Invalid clue: Given parameter is not a Clue."
    );
    //check if it left the clueCount as is
    expect(gamecontroller.clueCount).toBe(0);
  });

    test("GameController constructor: default clues and lock are created when no arguments are provided", () => {
      const gamecontroller = new GameController();
      expect(gamecontroller.clues).toHaveLength(4);
      expect(gamecontroller.clues[0]).toBeInstanceOf(Clue);
      expect(gamecontroller.clues[1]).toBeInstanceOf(Clue);
      expect(gamecontroller.clues[2]).toBeInstanceOf(Clue);
      expect(gamecontroller.lock).toBeInstanceOf(Lock);
      expect(console.error).not.toHaveBeenCalled();
    });

    test("GameController constructor: accepts passed Clue and Lock instances", () => {
      const clue1 = new Clue("clue 1", "test clue 1");
      const clue2 = new Clue("clue 2", "test clue 2");
      const clue3 = new Clue("clue 3", "test clue 3");
      const clue4 = new Clue("clue 4", "test clue 3");
      const lock = new Lock(9999, "test lock");

      const gamecontroller = new GameController(clue1, clue2, clue3, clue4, lock);

      expect(gamecontroller.clues).toHaveLength(3);
      // should preserve the passed instances
      expect(gamecontroller.clues[0]).toBe(clue1);
      expect(gamecontroller.clues[1]).toBe(clue2);
      expect(gamecontroller.clues[2]).toBe(clue3);
      expect(gamecontroller.clues[3]).toBe(clue4);
      expect(gamecontroller.lock).toBe(lock);
      expect(console.error).not.toHaveBeenCalled();
    });

  test("GameController.playGame ends the game when the correct lock solution is given", async () => {
    jest.spyOn(gamecontroller, "getInput").mockResolvedValueOnce(1234);

    await gamecontroller.playGame();
    expect(gamecontroller.gameComplete).toBe(true);
  });
});
