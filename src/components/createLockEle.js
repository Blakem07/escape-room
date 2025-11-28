import "./default.css";
import "./lock.css";

export default function createLockEle() {
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

  return wrapper.firstElementChild; // returns <div class="Container">
}
