/**
 * index.js
 * -----------------------------------------------------------------------------
 * This is the main entry point for the vanilla JavaScript starter template.
 * It imports and runs the App function, which renders a simple interactive view.
 *
 * You can use this file as the root of your Webpack/Babel project.
 * Replace or expand this entry point as your application grows.
 * -----------------------------------------------------------------------------
 */

import "./styles.css";
import "./components/game.css";
import "./css-reset.css";

import App from "./App.js";

document.addEventListener("DOMContentLoaded", () => {
  App();
});
