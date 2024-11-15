import love from "eslint-config-love"

export default [
  {
    ...love,
    rules: {
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
    },
    ignores: ["node_modules", "dist", "coverage", "build", ".vscode"],
  },
];
