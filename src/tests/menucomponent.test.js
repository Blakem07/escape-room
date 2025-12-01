/**
 * @jest-environment jsdom
 */
import MenuComponent from "../components/MenuComponent.js";

describe("MenuComponent Class Tests", () => {
  let validHTML;

  let menuComponent;
  let component;

  beforeEach(() => {
    validHTML = `    <div class="menuContainer">
      <h1 class="mainTitle">EXIT Newcastle</h1>

      <div class="lowerMenu">
        <p>Not ready to try the real thing?</p>
        <p>Have a go at this interactive game to get you start!</p>
        <p>Can you escape?</p>
        <button class="startBtn">START</button>
      </div>
    </div>`;

    menuComponent = new MenuComponent();
    component = menuComponent.render();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("MenuComponent.render() returns a div with the correct html", () => {
    expect(component instanceof HTMLDivElement).toBe(true);
    const normalizeHTML = (html) => html.replace(/\s+/g, " ").trim();
    expect(normalizeHTML(component.outerHTML)).toBe(normalizeHTML(validHTML));
  });
});
