import "./menu.css";
import "./lock.css";

export default class MenuComponent {
  constructor(onStart) {
    this.onStart = onStart;
    this.wrapper = document.createElement("div");

    this.wrapper.innerHTML = `    <div class="menuContainer">
      <h1 class="mainTitle">EXIT Newcastle</h1>

      <div class="lowerMenu">
        <p>Not ready to try the real thing?</p>
        <p>Have a go at this interactive game to get you start!</p>
        <p>Can you escape?</p>
        <button class="startBtn">START</button>
      </div>
    </div>`;
  }

  /**
   * Returns the main element of the lock component.
   *
   * Be careful when passing this method as a callback.
   * It must be bound to the instance (e.g. MenuComponent.render.bind(MenuComponent))
   * or wrapped in an arrow function, otherwise `this` will be undefined.
   *
   * @return {HTMLElement} The root DOM element of the menu component.
   */
  render() {
    return this.wrapper.firstElementChild;
  }
}
