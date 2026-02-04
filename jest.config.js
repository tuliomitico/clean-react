/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  roots: ["<rootDir>/src"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/main/**/*",
    "!<rootDir>/src/**/index.ts",
    "!**/*.d.ts",
  ],
  coverageDirectory: "coverage",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/tests/e2e/cypress",
    "<rootDir>/src/main/test/cypress"
  ],
  testEnvironment: "jsdom",
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "@/tests/(.*)": "<rootDir>/tests/$1",
    "@/(.*)": "<rootDir>/src/$1",
    "\\.scss$": "identity-obj-proxy",
  },
};
