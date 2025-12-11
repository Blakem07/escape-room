import Clue from "../classes/Clue";

describe("Clue Class Tests", () => {
  let clue;

  beforeEach(() => {
    clue = new Clue(
      "Handwritten Note",
      "The number for the first padlock digit is 1",
      "1"
    );
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Clue.name should not set name if it is not a string", () => {
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

  test("Clue.code should be set correctly", () => {
    expect(clue.code).toBe("1");
  });

  test("Clue.code should convert non-string input to string", () => {
    const numericClue = new Clue("Numeric Clue", "The code is numeric", 1234);
    expect(numericClue.code).toBe("1234");
  });

  test("Clue.code should not accept null or undefined", () => {
    const clue = new Clue("Note", "Info", "1");
    clue.code = null;
    expect(clue.code).toBe("1"); // unchanged

    clue.code = undefined;
    expect(clue.code).toBe("1"); // still unchanged
  });

  test("Clue.code should not accept empty or whitespace-only strings", () => {
    const clue = new Clue("Note", "Info", "1");
    clue.code = "";
    expect(clue.code).toBe("1");

    clue.code = "   ";
    expect(clue.code).toBe("1");
  });

  test("Clue.code should trim surrounding whitespace", () => {
    const clue = new Clue("Note", "Info", "  7  ");
    expect(clue.code).toBe("7");
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

  test("Clue.discover() sets isFound to true", () => {
    expect(clue.isFound).toBe(false);
    clue.discover();
    expect(clue.isFound).toBe(true);
  });
});
