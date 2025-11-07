import Clue from "../classes/Clue";

describe("Clue Class Tests", () => {
  let clue;

  beforeEach(() => {
    clue = new Clue(
      "Handwritten Note",
      "The number for the first padlock digit is 1"
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Clue Class is initialized correctly", () => {
    expect(clue.name).toBe("Handwritten Note");
    expect(clue.information).toBe(
      "The number for the first padlock digit is 1"
    );
    expect(clue.isFound).toBe(false);
  });

  test("Clue Class should not set name if it is not a string", () => {
    const invalidValues = [1234, null, undefined, {}, [], true];

    invalidValues.forEach((value) => {
      const originalName = clue.name;
      clue.name = value;
      expect(clue.name).toBe(originalName);
    });
  });

  test("Clue.information should not be set to an invalid value", () => {
    const invalidValues = [1234, null, undefined, {}, [], true];

    invalidValues.forEach((value) => {
      const originalInformation = clue.information;
      clue.information = value
      expect(clue.information).toBe(originalInformation)
    });
  });
});
