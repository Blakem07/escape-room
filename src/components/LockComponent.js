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

    // Build DOM like ModalComponent does
    this.root = this.initComponentHTML();

    this._attachInputHandlers();
    this._attachEnterHandler();
    this._attachClearHandler();
  }

  /**
   * Builds and returns the root HTML for the lock component.
   *
   * @returns {HTMLElement} Root container element.
   */
  initComponentHTML() {
    // Container
    const container = document.createElement("div");
    container.classList.add("Container");

    // Keypad wrapper
    const keypad = document.createElement("div");
    keypad.classList.add("keypad");
    container.appendChild(keypad);

    // Indicator lights
    const indicators = document.createElement("div");
    indicators.classList.add("KPIndicators");
    keypad.appendChild(indicators);

    for (let i = 1; i <= 4; i++) {
      const light = document.createElement("div");
      light.classList.add("KPLight");
      light.dataset.light = String(i);
      indicators.appendChild(light);
    }

    // Numpad
    const numpad = document.createElement("div");
    numpad.classList.add("numpad");
    keypad.appendChild(numpad);

    // Row creator
    const createRow = () => {
      const row = document.createElement("div");
      row.classList.add("numRow");
      return row;
    };

    // Digit button helper
    const createDigitButton = (digit) => {
      const btn = document.createElement("button");
      btn.classList.add("numKey");
      btn.dataset.key = String(digit);
      btn.textContent = String(digit);
      return btn;
    };

    // Row 1: 1 2 3
    const row1 = createRow();
    row1.appendChild(createDigitButton(1));
    row1.appendChild(createDigitButton(2));
    row1.appendChild(createDigitButton(3));
    numpad.appendChild(row1);

    // Row 2: 4 5 6
    const row2 = createRow();
    row2.appendChild(createDigitButton(4));
    row2.appendChild(createDigitButton(5));
    row2.appendChild(createDigitButton(6));
    numpad.appendChild(row2);

    // Row 3: left digits and Clear, right Enter
    const row3 = createRow();
    numpad.appendChild(row3);

    const leftColumn = document.createElement("div");
    leftColumn.classList.add("numColumn");
    row3.appendChild(leftColumn);

    // 7 8
    const row78 = createRow();
    row78.appendChild(createDigitButton(7));
    row78.appendChild(createDigitButton(8));
    leftColumn.appendChild(row78);

    // 9 0
    const row90 = createRow();
    row90.appendChild(createDigitButton(9));
    row90.appendChild(createDigitButton(0));
    leftColumn.appendChild(row90);

    // Clear button
    const clearBtn = document.createElement("button");
    clearBtn.classList.add("numKey", "numClear");
    clearBtn.dataset.key = "Clear";
    clearBtn.textContent = "Clear";
    leftColumn.appendChild(clearBtn);

    // Enter button
    const enterBtn = document.createElement("button");
    enterBtn.classList.add("numKey", "numEnter");
    enterBtn.dataset.key = "Enter";
    enterBtn.textContent = "Enter";
    row3.appendChild(enterBtn);

    // Status messages
    const errCode = document.createElement("div");
    errCode.classList.add("errCode");
    errCode.textContent = "Incorrect Entry";
    keypad.appendChild(errCode);

    const unlocked = document.createElement("div");
    unlocked.classList.add("unlocked");
    unlocked.textContent = "Unlocked!";
    keypad.appendChild(unlocked);

    return container;
  }

  /**
   * Attaches click handlers to numeric keys (excluding Enter and Clear).
   * Calls the `onInput` callback when a key is pressed.
   *
   * @return {void}
   */
  _attachInputHandlers() {
    const inputButtons = this.root.querySelectorAll(
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
   * @return {HTMLElement} The root DOM element of the lock component.
   */
  render() {
    return this.root; // always the same node, safe to attach/detach
  }

  /**
   * Attaches a click handler to the Enter button.
   *
   * @return {void}
   */
  _attachEnterHandler() {
    const enterButton = this.root.querySelector(".numEnter");
    if (!enterButton) return;

    enterButton.addEventListener("click", () => {
      if (this.onEnter) {
        this.onEnter();
      }
    });
  }

  /**
   * Attaches a click handler to the Clear button.
   *
   * @return {void}
   */
  _attachClearHandler() {
    const clearButton = this.root.querySelector(".numClear");
    if (!clearButton) return;

    clearButton.addEventListener("click", () => {
      if (this.onClear) {
        this.onClear();
      }
    });
  }
}
