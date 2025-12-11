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
 * @example
 * const inventoryModal = new ModalComponent(
 *   "Inventory",
 *   "",
 *   () => gameController.getCodeString()
 * );
 *
 * @class ModalComponent
 */
export default class ModalComponent {
  /**
   * Creates a new ModalComponent instance.
   * @param {string} [title=""]                  Title text displayed in the modal header.
   * @param {string} [bodyContent=""]            Static body text used when no refresh function is supplied.
   * @param {Function|null} [refreshBodyFn=null] Optional function that produces updated body content each time the modal renders.
   */
  constructor(title = "", bodyContent = "", refreshBodyFn = null) {
    this.root = this.initComponentHTML();
    this.title = title;
    this.bodyContent = bodyContent;
    this._refreshBodyFn = refreshBodyFn;
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
   * Uses the refresh function when available and its return value is non-null.
   * Otherwise restores the last stored static body content.
   *
   * @returns {void}
   */
  refreshBody() {
    const bodyDiv = this.root.querySelector(".modalBody");
    if (!bodyDiv) return;

    if (this._refreshBodyFn) {
      const val = this._refreshBodyFn();

      if (val !== undefined && val !== null) {
        const stringValue = String(val);
        bodyDiv.textContent = stringValue;
        this._bodyContent = stringValue;
        return;
      }
    }

    // Fallback to stored static body
    bodyDiv.textContent = this._bodyContent;
  }

  /**
   * Always calls refreshBody so render uses the latest content.
   *
   * @returns {HTMLElement} The root container of the modal component.
   */
  render() {
    this.refreshBody();
    return this.root;
  }
}
