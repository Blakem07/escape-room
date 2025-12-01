import "./default.css";
import "./lock.css";

export default function LockComponent(onInput) {
  const wrapper = document.createElement("div");

  wrapper.innerHTML = `
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

  const inputButtons = wrapper.querySelectorAll(
    '.numKey[data-key]:not([data-key="Enter"]):not([data-key="Clear"])'
  );
  handleOnInput(inputButtons, onInput);

  return wrapper.firstElementChild; // returns <div class="Container">
}

/**
 * Attaches an `onInput` callback function to a collection of buttons.
 *
 * When a button is clicked, the callback is called with the button's
 * `data-key` attribute value as its argument.
 *
 * @param {NodeListOf<HTMLButtonElement>} inputButtons - A NodeList of button elements to attach the listener to.
 * @param {(key: string) => void} onInput - A callback function that receives the key pressed as a string.
 */
function handleOnInput(inputButtons, onInput) {
  inputButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      onInput(e.target.dataset.key);
    });
  });
}
