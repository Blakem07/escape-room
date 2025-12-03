/**
 * @jest-environment jsdom
 */
import InventoryComponent from "../components/InventoryComponent.js";

describe("InventoryComponent tests", () => {
  let validHTML;
  let inventoryComponent;
  let component;
  beforeEach(() => {
    validHTML = `<div class="invContainer showObj">
        <div class="headerBar">
          <h1 class="invHeader">Inventory</h1>
          <button class="closeButton">✕</button>
        </div>
        <div class="invList">
          <ul>
            <li></li>
          </ul>
        </div>
      </div>`;

    inventoryComponent = new InventoryComponent();
    component = inventoryComponent.render();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("InventoryComponent.render() returns a div element containing the correct html", () => {
    expect(component instanceof HTMLDivElement).toBe(true);
    const normalizeHTML = (html) => html.replace(/\s+/g, " ").trim();
    expect(normalizeHTML(component.outerHTML)).toBe(normalizeHTML(validHTML));
  });

  test("InventoryComponent.render() sets the correct code string", () => {
    const testString = "Test Code String";
    const component = inventoryComponent.render(testString);
    const listItem = component.querySelector(".invList ul li");
    expect(listItem.textContent).toBe(testString);
  });
});
