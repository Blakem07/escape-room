/**
 * @jest-environment jsdom
 */

import UI from "../classes/UI";

describe("UI Class Tests", () => {
  let ui;

  let createPopupSpy;

  beforeEach(() => {
    ui = new UI();

    createPopupSpy = jest.spyOn(ui, "createPopup");
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

  test("UI.createPopup handles closeCallBack options correctly", () => {
    const closeCallBack = jest.fn();
    const popup = ui.createPopup({ closeCallBack });

    const closeButton = popup.querySelector(".popup-button");
    closeButton.click();

    expect(closeCallBack).toHaveBeenCalled();
    expect(closeCallBack).toHaveBeenCalledTimes(1);
  });

  test("UI.createCloseButton returns a button with an event listner calling the provided callback", () => {
    const closeCallBack = jest.fn();
    const closeButton = ui.createCloseButton(closeCallBack);

    expect(closeButton instanceof HTMLButtonElement).toBe(true);
    expect(closeButton.classList).toContain("popup-button");
    closeButton.click();

    expect(closeCallBack).toHaveBeenCalled();
    expect(closeCallBack).toHaveBeenCalledTimes(1);
  });
});
