module.exports = {
  presets: [
    [
      "@babel/preset-env",   // Transpile modern JS (ES6+) to compatible JS
      {
        useBuiltIns: "usage", // Auto-add only the polyfills you actually use
        corejs: 3,            // Use core-js v3 for polyfills
        targets: "> 0.25%, not dead" // Works in modern browsers and Node
      }
    ]
  ]
};
