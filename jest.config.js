module.exports = {
  watchPathIgnorePatterns: [
    "node_modules",
    ".git",
    "dist",
    ".*\\.swp",
    ".*\\.DS_Store",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
