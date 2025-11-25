/**
 * @jest-environment jsdom
 */

import UI from "../classes/UI";

describe("UI Class Tests", () => {
  let ui;

  let createPopupSpy;

  let closeCallbackMock;
  let createComponentMock;

  beforeEach(() => {
    ui = new UI();

    createPopupSpy = jest.spyOn(ui, "createPopup");

    closeCallbackMock = jest.fn();
    createComponentMock = jest.fn().mockImplementation(() => {
      const div = document.createElement("div");
      div.classList.add("component");
      return div;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("UI.createPopup should return a div with the popup class", () => {
    const popup = ui.createPopup();

    expect(createPopupSpy).toHaveBeenCalledTimes(1);
    expect(popup instanceof HTMLDivElement).toBe(true);
    expect(popup.classList).toContain("popup");
  });

  test("UI.createPopup handles function content options", () => {
    const popup = ui.createPopup({ content: createComponentMock });
    const popupContent = popup.querySelector(".popup-content");

    expect(popupContent instanceof HTMLDivElement).toBe(true);
    expect(popup.childNodes).toContain(popupContent);
  });

  test("UI.createPopup handles non function content options", () => {
    const invalidInputs = [
      123,
      true,
      null,
      undefined,
      { text: "Hello" },
      ["Hello", "World"],
      "hello",
    ];

    invalidInputs.forEach((input) => {
      const popup = ui.createPopup({ content: input });
      const popupContent = popup.querySelector(".popup-content");

      expect(popupContent instanceof HTMLDivElement).toBe(false);
      expect(popup.childNodes).not.toContain(popupContent);
    });
  });

  test("UI.createPopup appends content returned from content function", () => {
    const popup = ui.createPopup({ content: createComponentMock });
    const popupContent = popup.querySelector(".popup-content");
    const component = popupContent.firstChild;

    expect(createComponentMock).toHaveBeenCalled();
    expect(component instanceof HTMLDivElement).toBe(true);
    expect(component.classList).toContain("component");
  });

  test("UI.createPopup handles closeCallBack options correctly", () => {
    const popup = ui.createPopup({ closeCallBack: closeCallbackMock });

    const closeButton = popup.querySelector(".popup-button");
    closeButton.click();

    expect(closeCallbackMock).toHaveBeenCalled();
    expect(closeCallbackMock).toHaveBeenCalledTimes(1);
  });

  // Tests for createCloseButton

  test("UI.createCloseButton returns a button with an event listener calling the provided callback", () => {
    const closeCallBack = jest.fn();
    const closeButton = ui.createCloseButton(closeCallBack);

    expect(closeButton instanceof HTMLButtonElement).toBe(true);
    expect(closeButton.classList).toContain("popup-button");
    closeButton.click();

    expect(closeCallBack).toHaveBeenCalled();
    expect(closeCallBack).toHaveBeenCalledTimes(1);
  });

  test("UI.createCloseButton sets default text when no argument is given", () => {
    const closeButton = ui.createCloseButton(closeCallbackMock);

    expect(closeButton.innerText).toBe("Close");
  });

  test("UI.createCloseButton returns a button correct text", () => {
    const buttonText = "Start";
    const closeButton = ui.createCloseButton(closeCallbackMock, buttonText);

    expect(closeButton.innerText).toEqual(buttonText);
  });

  // Tests for closePopup

  test("UI.closePopup removes the closest element containing the popup class", () => {
    const popup = ui.createPopup({ closeCallBack: ui.closePopup });
    const closeButton = popup.querySelector(".popup-button");

    document.body.appendChild(popup);
    expect(document.body.childNodes).toContain(popup);

    closeButton.click();
    expect(document.body.childNodes).not.toContain(popup);
  });

  test("UI.closePopup handles non existing popup elements gracefully", () => {
    expect(() => {
      ui.closePopup(null);
    }).not.toThrow(TypeError);
  });

  test("UI.closePopup removes works corretly on elements not appended directly to body", () => {
    const popup = ui.createPopup({ closeCallBack: ui.closePopup });
    const closeButton = popup.querySelector(".popup-button");
    const subBody = document.createElement("div");

    document.body.appendChild(subBody);
    subBody.appendChild(popup);

    expect(subBody.childNodes).toContain(popup);
    closeButton.click();
    expect(subBody.childNodes).not.toContain(popup);
  });
});
