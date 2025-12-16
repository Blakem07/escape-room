## Project Overview

This project is a browser-based escape room game built with vanilla JavaScript. The application is structured around a modular UI system and a game state controller, with a focus on separation of concerns, testability, and a clear event-driven architecture.

At the time of submission, the front-end architecture and UI component layer are complete and fully tested. Game logic is encapsulated within the GameController module.

---

## Features

- Modular UI system with popup and overlay management
- Reusable UI components (Menu, Modal, LockComponent, Clue)
- Event-driven interaction flow
- Centralised game state management via GameController
- Jest test suite with CI support
- Demo-ready UI build

---

## Project Structure

```text
src/
├── App.js              # Application wiring / bootstrap
├── index.js            # Entry point
├── styles.css          # Global styles
├── css-reset.css       # CSS reset
├── template.html       # Base HTML template
│
├── assets/             # Static assets
│   └── images, icons
│
├── classes/            # Core application & game logic
│   ├── UI.js
│   ├── GameController.js
│   ├── Clue.js
│   ├── Lock.js
│   └── index.js
│
├── components/         # UI components + component-scoped styles
│   ├── LockComponent.js
│   ├── MenuComponent.js
│   ├── ModalComponent.js
│   ├── *.css
│   └── index.js
│
└── tests/              # Test suite
    ├── *.test.js
    └── visual/
        └── popup.preview.js
````

---

## Architecture Overview

The project follows a loosely coupled, event-driven architecture:

* **UI**
  Responsible only for DOM interaction, rendering, and emitting user intent via callbacks.

* **Components**
  Self-contained UI elements (Menu, Modal, LockComponent) that emit events but contain no game logic.

* **Clue**
  Represents discoverable game clues and their associated data and state.

* **Lock**
  Represents the final puzzle lock and encapsulates solution validation and solved state. Contains no UI logic and is consumed by GameController.

* **GameController**
  Owns overall game state and progression logic, coordinating Clue discovery and Lock validation. Does not interact with the DOM directly.

* **App (App.js)**
  Acts as the wiring layer that connects UI events to GameController methods.

This separation allows UI and game logic to evolve independently and keeps testing isolated and reliable.

---

## Running the Project

1. Clone the repository
2. Install dependencies

   ```
   npm install
   ```
3. Run tests

   ```
   npm test
   ```
4. Start the development server

   ```
   npm start
   ```
5. Start development server and tests together

   ```
   npm run dev
   ```

---

## Testing

* Jest is used for unit and behavioural testing
* UI components, core classes, and game logic are covered
* CI is configured to run the test suite automatically

---

## Demo Notes

A UI-only demo build is available to showcase interaction flow and completed front-end work. Game logic is isolated within the GameController and can be demonstrated independently if required.

---

## Contribution Notes

* UI and component architecture are complete and stable
* Further development should focus on extending or refining GameController logic without modifying UI internals
* UI components should communicate only via callbacks, not direct imports

---

## Credits

### Development

* Repository management, overall architecture, workflows, app wiring, UI system, components, and Clue logic: **Blake M.**
* Lock game logic and HTML/CSS: **Alex W.**
* GameController implementation: **Ben G.**

### Team Roles

* Project Manager: **Ben M.**
* Designer: **Mia R.**
* Cyber Security: **Rashid S.**
