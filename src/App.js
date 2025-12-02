/**
 * App.js
 * -----------------------------------------------------------------------------
 * This file defines a simple vanilla JavaScript view used as a starter template.
 * Its inspired by the default Vite/React setup, but built with plain JS.
 *
 * You can freely modify or replace this function to start building your own app.
 * The purpose of this file is only to render a minimal interactive example (a counter)
 * so you can verify that your Webpack + Babel + Jest setup is working correctly.
 * -----------------------------------------------------------------------------
 */
import UI from "./classes/UI.js";
import LockComponent from "./components/LockComponent.js";
import MenuComponent from "./components/MenuComponent.js";

export default function App() {
  // Main container
  const app = document.createElement("div");
  app.className = "app";

  // Header
  const header = document.createElement("header");
  header.className = "app-header";
  header.innerHTML = `
    <h1>Welcome to Vanilla JS Starter Template!</h1>
    <p>Edit <code>src/App.js</code> and save to reload.</p>
  `;

  // Counter button
  const button = document.createElement("button");
  button.textContent = "Count is 0";
  let count = 0;
  button.addEventListener("click", () => {
    count++;
    button.textContent = `Count is ${count}`;
  });

  // Append elements
  header.appendChild(button);
  app.appendChild(header);

  //////////////////////////////////////
  //                                  //
  //     BELOW IS TESTING THE         //
  //           REAL APP               //
  //                                  //
  //////////////////////////////////////

  // Currently checking components

  const ui = new UI();

  const lockComponent = new LockComponent((e) => console.log(e));
  const menuComponent = new MenuComponent();

  const content = [
    lockComponent.render.bind(lockComponent),
    menuComponent.render.bind(menuComponent),
  ];
  const overlay = [
    ui.createBlurOverlay,
    () => ui.createImageOverlay(menuComponent.bgImage),
  ];
  const select = 0; //  <---- change between 0 and 1 to test different options ----> //

  const testPopup = ui.createPopup({
    overlay: overlay[select],
    content: content[select],
    closeCallBack: ui.closePopup,
  });

  app.append(testPopup);
  document.body.appendChild(app);

  return app;
}

// Testing CI Workflow
