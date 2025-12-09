/**
 * Manages creation and interaction of UI elements such as popups,
 * overlays, buttons, and event-driven components.
 *
 * The `UI` class provides a system for:
 * - Registering click-based triggers that open component-driven popups
 * - Generating reusable popup containers with optional content, sizing, and overlays
 * - Creating blur or image-based overlays
 * - Supplying standardized close-button behavior
 *
 * Popups are built dynamically at the time of interaction, allowing components
 * to render themselves only when needed. Overlay wrappers can optionally be used
 * to create modal-style effects.
 *
 * @class UI
 */
export default class UI {
  /**
   * Initializes event listeners for the inventory
   * and hint button, clickable clues and the lock.
   *
   * @returns {void}
   */
  initEventListeners(componentMap) {
    const body = document.body;

    Object.entries(componentMap).forEach(([selector, component]) => {
      const triggers = document.querySelectorAll(selector);

      if (!triggers.length) return;

      triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
          const popup = this.createPopup({
            content: () => component.render(),
            overlay: () => this.createBlurOverlay(),
            closeCallBack: this.closePopup,
          });

          body.appendChild(popup);
        });
      });
    });
  }

  /**
   * Creates a popup div element with optional content and a close button.
   *
   * @param {Object} options - The configuration options for the popup.
   * @param {Function} [options.content] - A function that returns the content to be displayed inside the popup. If provided, the popup will include this content inside a `div` with class `popup-content`.
   * @param {string} [options.size] - An optional size class to be added to the popup (e.g., 'small', 'large').
   * @param {Function} [options.overlay] - An optional overlay element to wrap the popup, and be returned as root.
   * @param {Function} [options.closeCallBack] - A callback function to be executed when the close button is clicked. If provided, a close button will be added to the popup.
   *
   * @returns {HTMLDivElement} The created popup element, optionally wrapped in an overlay.
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

    if (this.isValidPopupSize(options.size)) {
      popup.classList.add(`popup-${options.size}`);
    }

    let wrapper = popup; // default return value of popup as root

    if (options.overlay && typeof options.overlay === "function") {
      const overlayElement = options.overlay();
      overlayElement.appendChild(popup);
      wrapper = overlayElement; // returns the overlay as root
    }

    if (options.closeCallBack) {
      const closeButton = this.createCloseButton(options.closeCallBack);
      popup.appendChild(closeButton);
    }

    return wrapper;
  }

  /**
   * Validates if the provided size is a valid popup size.
   *
   * @param {string} size - The size to be validated.
   * @returns {boolean} True if the size is valid ('small', 'medium', 'large'), false otherwise.
   */
  isValidPopupSize(size) {
    const validSizes = ["small", "medium", "large"];
    return validSizes.includes(size);
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
    const overlay = event.target.closest(".popup-overlay");

    popup?.remove();
    overlay?.remove();
  }

  /**
   * Creates a div element with popup-overlay and blur classes
   *
   * @returns {HTMLDivElement} - The created overlay element
   */
  createBlurOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("popup-overlay", "blur");

    return overlay;
  }

  /**
   * Creates an overlay <div> with popup-overlay and image-overlay classes,
   * and applies the given image URL as its background.
   *
   * @example
   * When passing this method as an option to other functions (e.g. createPopup),
   * you must wrap it in an arrow function so it is executed later, not immediately:
   *
   *    () => ui.createImageOverlay(bgUrl)
   *
   * This ensures the overlay is created at the correct time and with the correct image URL.
   *
   * @param {string} imgUrl - The URL of the background image.
   * @returns {HTMLDivElement} The created overlay element.
   */
  createImageOverlay(imgUrl) {
    const overlay = document.createElement("div");
    overlay.classList.add("popup-overlay", "image-overlay");
    overlay.style.backgroundImage = `url("${imgUrl}")`;
    return overlay;
  }
}
