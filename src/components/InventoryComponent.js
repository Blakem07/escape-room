export default class InventoryComponent {
  constructor() {
    this.wrapper = document.createElement("div");
    this.wrapper.innerHTML = `<div class="modal showObj">
        <div class="headerBar">
          <h1 class="modalHeader">Inventory</h1>
        </div>
        <div class="modalList">
          <ul>
            <li></li>
          </ul>
        </div>
      </div>`;
    this.codeStringEle = this.wrapper.querySelector(".modalList ul li");
  }

  /**
   * Returns the main element of the inventory component.
   *
   * Updates the displayed code string using the provided `codeString`
   * and returns the root DOM element of the component.
   *
   * Be careful when passing this method as a callback.
   * It must be bound to the instance (e.g. inventoryComponent.render.bind(inventoryComponent))
   * or wrapped in an arrow function; otherwise `this` will be undefined.
   *
   * @param {string} codeString - The code string to display in the inventory UI.
   * @return {HTMLElement} The root DOM element of the inventory component.
   */
  render(codeString) {
    this.codeStringEle.textContent = codeString;

    return this.wrapper.firstElementChild;
  }
}
