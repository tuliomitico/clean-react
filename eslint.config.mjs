import love from "eslint-config-love";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

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
      "@typescript-eslint/class-methods-use-this": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-magic-numbers": "off",
    },
    ignores: ["node_modules", "dist", "coverage", "build", ".vscode"],
  },
  eslintPluginPrettier,
];
