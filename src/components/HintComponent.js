import "./inventory.css";

export default class HintComponent {
  constructor(hintText = "This is a hint!") {
    this.hintText = hintText;
    this.wrapper = document.createElement("div");
    this.wrapper.innerHTML = `
      <div class="invContainer showObj">
        <div class="headerBar">
          <h1 class="invHeader">Hint</h1>
        </div>
        <div class="invList">
          <ul>
            <li>item 1</li>
          </ul>
        </div>
      </div>`;

    const hintEle = this.wrapper.querySelector(".invList ul li");
    hintEle.textContent = hintText;
  }

  /**
   * Returns the main element of the lock component.
   *
   * Be careful when passing this method as a callback.
   * It must be bound to the instance (e.g. hintComponent.render.bind(hintComponent))
   * or wrapped in an arrow function, otherwise `this` will be undefined.
   *
   * @return {HTMLElement} The root DOM element of the lock component.
   */
  render() {
    return this.wrapper.firstElementChild;
  }
}
