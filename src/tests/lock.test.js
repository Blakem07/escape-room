import Lock from "../classes/Lock";

describe("Lock Class Test", () => {
    let lock;

    beforeEach(() => {
        lock = new Lock(1234, "Combination Lock")
        jest.spyOn(console, "error").mockImplementation(()=>{});
        jest.spyOn(console, "log").mockImplementation(()=>{});
    });

    afterEach(()=>{
        jest.restoreAllMocks()
    });

    test("Lock.isSolved should only be set to a boolean", ()=> {
        const invalidValues = [1234, null, undefined, {}, [], "true"];

        invalidValues.forEach((value)=> {
            const originalIsSolved = lock.isSolved;
            lock.isSolved = value;
            expect(lock.isSolved).toBe(originalIsSolved)
            expect(console.error).toHaveBeenCalledWith(
                "Invalid isSolved: isSolved must be a boolean."
            );
        });
    });

    test("Lock.solution should be a non-empty value",()=>{
        const invalidValues = ["","1234", null, undefined, {}, [], true];

        invalidValues.forEach((value)=>{
            const originalSolution = lock.solution
            lock.solution = value;
            expect(lock.solution).toBe(originalSolution);
            expect(console.error).toHaveBeenCalledWith(
            "Invalid Solution: Solution must be a positive number."
            );
        }); 
    });

    test("Lock.inputType should not a non-empty string", ()=>{
        const invalidValues = ["", 1234, null, undefined, {}, [], true];

        invalidValues.forEach((value)=>{
            const originalInputType = lock.inputType;
            lock.inputType = value;
            expect(lock.inputType).toBe(originalInputType);
            expect(console.error).toHaveBeenCalledWith(
                "Invalid inputType: inputType must be a non-empty string."
            );
        });
    });

    test("Lock.checkSolution() sets isSolved to true when correct",()=>{
        const lock = new Lock(1234, "Combination Lock");

        expect(lock.isSolved).toBe(false);
        const result = lock.checkSolution(1234);
        expect(lock.isSolved).toBe(true);
        expect(result).toBe(true);
        expect(console.log).toHaveBeenCalledWith("Lock unlocked!");
    });

    test("Lock.checkSolution() sets isSolved to false when incorrect",()=>{
        const lock = new Lock(1234, "Combination Lock");

        expect(lock.isSolved).toBe(false);
        const result = lock.checkSolution(9999);
        expect(lock.isSolved).toBe(false);
        expect(result).toBe(false);
        expect(console.log).toHaveBeenCalledWith("Wrong combination.");
    });
});