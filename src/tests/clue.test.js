import Clue from "../classes/Clue";

describe("Clue Class Tests", () => {
  let clue;

  beforeEach(() => {
    clue = new Clue(
      "Handwritten Note",
      "The number for the first padlock digit is 1"
    );
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Clue Class should not set name if it is not a string", () => {
    const invalidValues = [1234, null, undefined, {}, [], true];

    invalidValues.forEach((value) => {
      const originalName = clue.name;
      clue.name = value;
      expect(clue.name).toBe(originalName);
      expect(console.error).toHaveBeenCalledWith(
        "Invalid name: Name must be a non-empty string."
      );
    });
  });

  test("Clue.information should not be set to an invalid value", () => {
    const invalidValues = [1234, null, undefined, {}, [], true];
    
    invalidValues.forEach((value) => {
      const originalInformation = clue.information;
      clue.information = value;
      expect(clue.information).toBe(originalInformation);
      expect(console.error).toHaveBeenCalledWith(
        "Invalid information: Information must be a non-empty string."
      );
    });
  });

  test("Clue.isFound should only set to a boolean", () => {
    const invalidValues = [1234, null, undefined, {}, [], "true"];
    
    invalidValues.forEach((value) => {
      const originalIsFound = clue.isFound;
      clue.isFound = value;
      expect(clue.isFound).toBe(originalIsFound);
      expect(console.error).toHaveBeenCalledWith(
        "Invalid isFound: isFound must be a boolean."
      );
    });
  });
});
