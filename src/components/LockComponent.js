import "./default.css";
import "./lock.css";

/**
 * UI component that renders a numeric lock keypad.
 *
 * Provides buttons for digits (0–9), Clear, and Enter, and forwards user actions
 * to the callbacks passed into the constructor. The component contains no lock logic:
 * it only emits input events.
 *
 * @class
 * @param {function(string):void} onInput  Called when a digit key is pressed.
 * @param {function():void}        onEnter Called when Enter is pressed.
 * @param {function():void}        onClear Called when Clear is pressed.
 */
export default class LockComponent {
  constructor(onInput, onEnter, onClear) {
    this.onInput = onInput;
    this.onEnter = onEnter;
    this.onClear = onClear;
    this.wrapper = document.createElement("div");

    this.wrapper.innerHTML = `
      <div class="Container">
        <div class="keypad">
          <div class="KPIndicators">
            <div class="KPLight" data-light="0"></div>
            <div class="KPLight" data-light="1"></div>
            <div class="KPLight" data-light="2"></div>
            <div class="KPLight" data-light="3"></div>
            <div class="KPLight" data-light="4"></div>
          </div>

          <div class="numpad">
            <div class="numRow">
              <button class="numKey" data-key="1">1</button>
              <button class="numKey" data-key="2">2</button>
              <button class="numKey" data-key="3">3</button>
            </div>

            <div class="numRow">
              <button class="numKey" data-key="4">4</button>
              <button class="numKey" data-key="5">5</button>
              <button class="numKey" data-key="6">6</button>
            </div>

            <div class="numRow">
              <div class="numColumn">
                <div class="numRow">
                  <button class="numKey" data-key="7">7</button>
                  <button class="numKey" data-key="8">8</button>
                </div>

                <div class="numRow">
                  <button class="numKey" data-key="9">9</button>
                  <button class="numKey" data-key="0">0</button>
                </div>

                <button class="numKey numClear" data-key="Clear">Clear</button>
              </div>

              <button class="numKey numEnter" data-key="Enter">Enter</button>
            </div>
          </div>

          <div class="errCode">Incorrect Entry</div>
          <div class="unlocked">Unlocked!</div>
        </div>
      </div>
    `;

    this._attachInputHandlers();
    this._attachEnterHandler();
    this._attachClearHandler();
  }

  /**
   * Attaches click handlers to numeric keys (excluding Enter and Clear).
   * Calls the `onInput` callback when a key is pressed.
   *
   * @return {void}
   */
  _attachInputHandlers() {
    const inputButtons = this.wrapper.querySelectorAll(
      '.numKey[data-key]:not([data-key="Enter"]):not([data-key="Clear"])'
    );

    inputButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        if (this.onInput) {
          this.onInput(e.target.dataset.key);
        }
      });
    });
  }

  /**
   * Returns the main element of the lock component.
   *
   * Be careful when passing this method as a callback.
   * It must be bound to the instance (e.g. lockComponent.render.bind(lockComponent))
   * or wrapped in an arrow function, otherwise `this` will be undefined.
   *
   * @return {HTMLElement} The root DOM element of the lock component.
   */
  render() {
    return this.wrapper.firstElementChild;
  }

  /**
   * Attaches a click handler to the Enter button.
   * When clicked, it triggers `onEnter()`, which submits
   * the code tracked internally by the Lock (no arguments needed).
   *
   * @return {void}
   */
  _attachEnterHandler() {
    const enterButton = this.wrapper.querySelector(".numEnter");
    enterButton.addEventListener("click", () => {
      this.onEnter();
    });
  }
  /**
   * Attaches a click handler to the Clear button.
   * When clicked, it triggers `onClear()`, which clears the
   * code tracked internally by the Lock (no arguments needed).
   *
   * @return {void}
   */
  _attachClearHandler() {
    const clearButton = this.wrapper.querySelector(".numClear");
    clearButton.addEventListener("click", () => {
      this.onClear();
    });
  }
}
