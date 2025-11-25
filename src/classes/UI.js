/**
 * UI class to handle user interface elements
 *
 * Provides methods to create popups and buttons. TODO...
 *
 * @class UI
 */
export default class UI {
  
  /**
   * Creates a popup div element with optional content and a close button.
   *
   * @param {Object} options - The configuration options for the popup.
   * @param {Function} [options.content] - A function that returns the content to be displayed inside the popup. If provided, the popup will include this content inside a `div` with class `popup-content`.
   * @param {Function} [options.closeCallBack] - A callback function to be executed when the close button is clicked. If provided, a close button will be added to the popup.
   *
   * @returns {HTMLDivElement} The created popup element. This is a `div` element with the class `popup`, and it may contain content and a close button based on the provided options.
   */
  createPopup(options = {}) {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    if (options.content && typeof options.content === "function") {
      const popupContent = document.createElement("div");
      popupContent.classList.add("popup-content");

      const contentElement = options.content();
      popupContent.appendChild(contentElement);

      popup.appendChild(popupContent);
    }

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

    closeButton.addEventListener("click", (event) => {
      closeCallBack(event);
    });

    return closeButton;
  }

  /**
   * A Callback function which closes the nearest element
   * containing the popup class.
   *
   * @param {Event} - The event that triggered the close action
   * @returns {Void}
   */
  closePopup(event) {
    if (!event) return;

    const popup = event.target.closest(".popup");

    if (popup) {
      popup.remove();
    }
  }
}
