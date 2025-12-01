/**
 * @jest-environment jsdom
 */
import LockComponent from "../components/LockComponent";

describe("LockComponent tests", () => {
  let validHTML;

  let onInputMock;

  let component;
  let inputButtons;
  beforeEach(() => {
    validHTML = `
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

    onInputMock = jest.fn();

    component = LockComponent(onInputMock);
    inputButtons = component.querySelectorAll(
      '.numKey[data-key]:not([data-key="Enter"]):not([data-key="Clear"])'
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("LockComponent returns a div element containing the correct html", () => {
    expect(component instanceof HTMLDivElement).toBe(true);
    expect(component.outerHTML.trim()).toBe(validHTML.trim());
  });

  test("LockComponent takes onInput as an argument and handles it correctly", () => {
    inputButtons.forEach((btn) => {
      btn.click();
      expect(onInputMock).toHaveBeenCalledWith(btn.dataset.key);
    });
  });
});
