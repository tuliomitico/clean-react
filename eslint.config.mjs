import love from "eslint-config-love";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  love,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig-eslint.json",
      },
    },
    rules: {
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
    },
    ignores: ["node_modules", "dist", "coverage", "build", ".vscode"],
  },
];
