import { Clue, Lock, GameController, UI } from "./classes/index.js";
import { MenuComponent, LockComponent, ModalComponent } from "./components/index.js";

/**
 * Initializes and renders the main application for the escape-room game.
 *
 * @function App
 * @returns {HTMLDivElement} The root application element appended to the DOM.
 */
export default function App() {
  const app = document.createElement("div");
  app.className = "app";

  const ui = new UI();

  // --- Menu Popup ------------------------------------------------------------
  const menuComponent = new MenuComponent();

  const menuPopup = ui.createPopup({
    content: () => menuComponent.render(),
    overlay: () => ui.createImageOverlay(menuComponent.bgImage),
    closeCallBack: ui.closePopup,
  });

  app.appendChild(menuPopup);

  // --- Clues -----------------------------------------------------------------
  const clues = [
    new Clue("Handwritten Note", "The first number on the lock is 1.", "1"),
    new Clue("Photograph", "The second number on the lock is 4.", "4"),
    new Clue("Diary Entry", "The third number on the lock is 5.", "5"),
    new Clue("Strange Symbol", "The fourth number on the lock is 9.", "9"),
  ];

  // --- Game Controller / Lock ------------------------------------------------
  const lock = new Lock(1459, "EXIT lock");
  const gameController = new GameController(clues[0], clues[1], clues[2], clues[3], lock, ui.createPopup.bind(ui), ui.createBlurOverlay.bind(ui));

  // --- Modal Components -------------------------------------------------------
  const hintModal = new ModalComponent(
    "Hint",
    "Search the room and click on items to reveal clues."
  );

  const inventoryModal = new ModalComponent("Inventory", "", () =>
    gameController.getCodeString()
  );

  const lockComponent = new LockComponent(gameController.lockInput.bind(gameController), gameController.lockEnter.bind(gameController), gameController.lockClear.bind(gameController));

  const clueModals = clues.map(
    (clue) => new ModalComponent(`Clue - ${clue.name}`, clue.information)
  );

  // --- Component Mapping (CSS selector -> component) --------------------------
  const componentMap = {
    ".Hint": hintModal,
    ".Inventory": inventoryModal,
    ".Lock": lockComponent,
    ".Clue1": clueModals[0],
    ".Clue2": clueModals[1],
    ".Clue3": clueModals[2],
    ".Clue4": clueModals[3],
  };

  ui.initEventListeners(componentMap, gameController.getInput.bind(gameController));
  
  document.body.appendChild(app);
  return app;
}
