import "./modal.css";
/**
 * Represents a modal UI component with a title and body content.
 *
 * The `ModalComponent` class provides a simple way to create modal dialogs
 * with customizable titles and body text.
 *
 * @example
 * const hintModal = new ModalComponent(
 *  "Hint",
 *  "Search the room and click on items to reveal clues."
 * );
 *
 * @class ModalComponent
 */
export default class ModalComponent {
  /**
   * Creates a new ModalComponent instance.
   * @param {string} [title=""] - The title text to display in the modal header.
   * @param {string} [bodyContent=""] - The body text/content of the modal.
   */
  constructor(title = "", bodyContent = "") {
    this.root = this.initComponentHTML();
    this.title = title;
    this.bodyContent = bodyContent;
  }

  /**
   * Initializes and returns the root HTML structure of the modal.
   * @returns {HTMLElement} The root container of the modal component.
   */
  initComponentHTML() {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("modal", "showObj");

    const headerDiv = document.createElement("div");
    headerDiv.classList.add("headerBar");
    const headerH1 = document.createElement("h1");
    headerH1.classList.add("modalHeader");
    headerDiv.appendChild(headerH1);
    containerDiv.appendChild(headerDiv);

    const bodyDiv = document.createElement("div");
    bodyDiv.classList.add("modalBody");
    containerDiv.appendChild(bodyDiv);

    return containerDiv;
  }

  set title(value) {
    const stringValue = String(value);
    const headerH1 = this.root.querySelector(".modalHeader");
    headerH1.textContent = stringValue;
    this._title = stringValue;
  }

  get title() {
    return this._title;
  }

  set bodyContent(value) {
    const stringValue = String(value);
    const bodyDiv = this.root.querySelector(".modalBody");
    bodyDiv.textContent = stringValue;
    this._bodyContent = stringValue;
  }

  get bodyContent() {
    return this._bodyContent;
  }

  /**
   * Returns the root DOM element for rendering.
   * @returns {HTMLElement} The modal's root element.
   */
  render() {
    return this.root;
  }
}
