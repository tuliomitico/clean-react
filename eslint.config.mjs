import love from "eslint-config-love";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  love,
  reactPlugin.configs.flat.recommended,
  eslintPluginPrettier,
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
      "@typescript-eslint/triple-slash-reference": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
    },
    ignores: ["node_modules", "dist", "coverage", "build", ".vscode"],
  },
];
