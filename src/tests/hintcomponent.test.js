/**
 * @jest-environment jsdom
 */
import HintComponent from "../components/HintComponent.js";

describe("HintComponent tests", () => {
  let validHTML;
  let hintComponent;
  let component;

  beforeEach(() => {
    validHTML = `
      <div class="invContainer showObj">
        <div class="headerBar">
          <h1 class="invHeader">Hint</h1>
        </div>
        <div class="invList">
          <ul>
            <li>Test Hint</li>
          </ul>
        </div>
      </div>`;

    hintComponent = new HintComponent("Test Hint");
    component = hintComponent.render();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("HintComponent initializes with hintText and wrapper", () => {
    expect(hintComponent.hintText).toBe("Test Hint");
    expect(hintComponent.wrapper instanceof HTMLDivElement).toBe(true);
  });

  test("HintComponent.render() returns a div element containing the correct html", () => {
    expect(component instanceof HTMLDivElement).toBe(true);
    const normalizeHTML = (html) => html.replace(/\s+/g, " ").trim();
    expect(normalizeHTML(component.outerHTML)).toBe(normalizeHTML(validHTML));
  });
});
