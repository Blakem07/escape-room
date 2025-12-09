import "./menu.css";
import "./lock.css";
import bgImage from "../assets/MenuComponentBg.jpg";

/**
 * The MenuComponent class serves as the main menu interface for the escape room game.
 * It displays the game title and introductory text to the player,
 * and is shown using the UI's popup system.
 *
 * @class MenuComponent
 */
export default class MenuComponent {
  constructor() {
    this.wrapper = document.createElement("div");
    this.bgImage = bgImage;

    this.wrapper.innerHTML = `        <div class="menuContainer">
      <h1 class="mainTitle">EXIT Newcastle</h1>

      <div class="lowerMenu">
        <p>Not ready to try the real thing?</p>
        <p>Have a go at this interactive game to get you start!</p>
        <p>Can you escape?</p>
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
