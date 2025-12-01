/**
 * @jest-environment jsdom
 */
import LockComponent from "../components/LockComponent";

describe("LockComponent tests", () => {
  let validHTML;

  let onInputMock;
  let onEnterMock;
  let onClearMock;

  let lockComponent;
  let component;
  let inputButtons;
  let enterButton;
  let clearButton;

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
    onEnterMock = jest.fn();
    onClearMock = jest.fn();

    lockComponent = new LockComponent(onInputMock, onEnterMock, onClearMock);
    component = lockComponent.render();
    inputButtons = component.querySelectorAll(
      '.numKey[data-key]:not([data-key="Enter"]):not([data-key="Clear"])'
    );
    enterButton = component.querySelector(".numEnter");
    clearButton = component.querySelector(".numClear");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("LockComponent returns a div element containing the correct html", () => {
    expect(component instanceof HTMLDivElement).toBe(true);
    const normalizeHTML = (html) => html.replace(/\s+/g, " ").trim();
    expect(normalizeHTML(component.outerHTML)).toBe(normalizeHTML(validHTML));
  });

  test("LockComponent takes onInput as an argument and attaches it to trigger on click", () => {
    inputButtons.forEach((btn) => {
      btn.click();
      expect(onInputMock).toHaveBeenCalledWith(btn.dataset.key);
    });
  });

  test("LockComponent takes onEnter as an argument and attaches it to trigger on click", () => {
    enterButton.click();
    expect(onEnterMock).toHaveBeenCalled();
  });

  test("LockComponent takes onClear as an argument and attaches it to trigger on click", () => {
    clearButton.click();
    expect(onClearMock).toHaveBeenCalled();
  });
});
