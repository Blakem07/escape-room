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
import popupPreview from "./tests/visual/popup.preview.js";

export default function App() {
  const app = document.createElement("div");
  app.className = "app";

  //////////////////////////////////////
  //                                  //
  //     BELOW IS TESTING THE         //
  //           REAL APP               //
  //                                  //
  //////////////////////////////////////

  // Currently checking components
  popupPreview(2);

  document.body.appendChild(app);
  return app;
}
