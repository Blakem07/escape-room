/**
 * UI class to handle user interface elements
 *
 * Provides methods to create popups and buttons. TODO...
 *
 * @class UI
 */
export default class UI {
  /**
   * Creates a popup div element
   *
   * @param {*} options - Options for the popup
   * @returns - {HTMLDivElement} - The created popup element
   */
  createPopup(options = {}) {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    if (options.closeCallBack) {
      const closeButton = this.createCloseButton(options.closeCallBack);
      popup.appendChild(closeButton);
    }

    return popup;
  }

  /**
   * Creates a close button element with an event listener
   *
   * @param {Function} closeCallBack - The callback function to be called on click
   * @returns {HTMLButtonElement} - The created close button element
   */
  createCloseButton(closeCallBack, text = "Close") {
    const closeButton = document.createElement("button");
    closeButton.classList.add("popup-button");
    closeButton.innerText = text;

    closeButton.addEventListener("click", () => {
      closeCallBack();
    });

    return closeButton;
  }
}
