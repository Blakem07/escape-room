/**
 * @jest-environment jsdom
 */

import GameController from "../classes/GameController";
import Clue from "../classes/Clue";
import Lock from "../classes/Lock";

describe("GameController class tests", () => {
  let gamecontroller;
  let clue1;
  let clue2;
  let clue3;
  let clue4;
  let lock;

  beforeEach(() => {
    clue1 = new Clue("clue 1", "test clue", "1");
    clue2 = new Clue("clue 2", "test clue", "2");
    clue3 = new Clue("clue 3", "test clue", "3");
    clue4 = new Clue("clue 4", "test clue", "4");
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
    expect(gamecontroller.clueCount).toBe(1);
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
      const clue1 = new Clue("clue 1", "test clue 1", "9");
      const clue2 = new Clue("clue 2", "test clue 2", "9");
      const clue3 = new Clue("clue 3", "test clue 3", "9");
      const clue4 = new Clue("clue 4", "test clue 3", "9");
      const lock = new Lock(9999, "test lock");

      const gamecontroller = new GameController(clue1, clue2, clue3, clue4, lock);

      expect(gamecontroller.clues).toHaveLength(4);
      // should preserve the passed instances
      expect(gamecontroller.clues[0]).toBe(clue1);
      expect(gamecontroller.clues[1]).toBe(clue2);
      expect(gamecontroller.clues[2]).toBe(clue3);
      expect(gamecontroller.clues[3]).toBe(clue4);
      expect(gamecontroller.lock).toBe(lock);
      expect(console.error).not.toHaveBeenCalled();
    });

  test("test GameController.getCodeString returns appropriate code strings", () => {
  const gamecontroller = new GameController();
  gamecontroller._clue1.discover();
  gamecontroller._clue3.discover();

  expect(gamecontroller.getCodeString()).toBe("1_1_");
});

test("test GameController.getCodeString properly gives an error if the clues have no valid code", () => {
  const gamecontroller = new GameController();
  gamecontroller._clues = [
    { isFound: true},
    { isFound: false},
    { isFound: true},
    { isFound: false}
    ];
  
  expect(gamecontroller.getCodeString()).toBe("____");
  expect(console.error).toHaveBeenCalledWith("clue does not have a valid code");
});

test("test if GameController.completeGame properly gives an error if ui functions are not given", () => {
  const gamecontroller = new GameController();
  gamecontroller.completeGame();
  
  expect(console.error).toHaveBeenCalledWith("UI functions are missing from GameController instance");
});

test("test if GameController.lockEnter calls gameComplete if correct solution is given by lockInput", () => {
  const gamecontroller = new GameController();
  jest.spyOn(gamecontroller, "completeGame").mockImplementation(() => {});
  gamecontroller.lockInput(1);
  gamecontroller.lockInput(1);
  gamecontroller.lockInput(1);
  gamecontroller.lockInput(1);
  gamecontroller.lockEnter();
  
  expect(gamecontroller.completeGame).toHaveBeenCalled();
});

test("test if GameController.getInput calls increaseClueCount if appropriate selector is given", () => {
  const gamecontroller = new GameController();
  jest.spyOn(gamecontroller, "increaseClueCount").mockImplementation(() => {});

  gamecontroller.getInput(".Clue1");
  expect(gamecontroller.increaseClueCount).toHaveBeenCalledWith(gamecontroller._clue1);
});

});
