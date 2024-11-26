import love from "eslint-config-love";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  love,
  {
    settings: {
      react: { version: "detect" },
    },
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
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    },
    ignores: ["node_modules", "dist", "coverage", "build", ".vscode"],
  },
  reactPlugin.configs.recommended,
  eslintPluginPrettier,
];
