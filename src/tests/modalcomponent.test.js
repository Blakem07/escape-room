/**
 * @jest-environment jsdom
 */
import ModalComponent from "../components/ModalComponent.js";

describe("ModalComponent Class Tests", () => {
  let modalComponent;

  beforeEach(() => {
    modalComponent = new ModalComponent();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("ModalComponent initializes with the correct HTML", () => {
    const root = modalComponent.root;

    const expected = `
    <div class="modal showObj">
      <div class="headerBar">
        <h1 class="modalHeader"></h1>
      </div>
      <div class="modalBody"></div>
    </div>
  `;

    // Normalize HTML so whitespace differences don't break tests.
    // 1. Remove whitespace between tags (e.g., ">\n  <" → "><")
    // 2. Collapse any remaining whitespace into a single space
    // 3. Trim leading/trailing whitespace
    const normalizeHTML = (html) =>
      html.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();

    expect(normalizeHTML(root.outerHTML)).toBe(normalizeHTML(expected));
  });

  test("ModalComponent.render() returns the root element", () => {
    const rendered = modalComponent.render();
    expect(rendered).toBe(modalComponent.root);
  });

  test("ModalComponent sets the title", () => {
    const modalComponent = new ModalComponent("Test Title");
    const modal = modalComponent.render();

    expect(modal.querySelector(".modalHeader").textContent).toBe("Test Title");
    expect(modalComponent.title).toBe("Test Title");
  });

  test("ModalComponent converts non-string title values to strings", () => {
    const modalComponent = new ModalComponent(12345);
    const modal = modalComponent.render();

    expect(modal.querySelector(".modalHeader").textContent).toBe("12345");
    expect(modalComponent.title).toBe("12345");
  });

  test("ModalComponent sets the body content", () => {
    const modalComponent = new ModalComponent("", "Body Test");
    const modal = modalComponent.render();
    const bodyDiv = modal.querySelector(".modalBody");

    expect(bodyDiv.textContent).toEqual("Body Test");
    expect(modalComponent.bodyContent).toBe("Body Test");
  });

  test("ModalComponent converts non-string body content to a string", () => {
    const modalComponent = new ModalComponent("", 9999);
    const modal = modalComponent.render();

    expect(modal.querySelector(".modalBody").textContent).toBe("9999");
    expect(modalComponent.bodyContent).toBe("9999");
  });
});
