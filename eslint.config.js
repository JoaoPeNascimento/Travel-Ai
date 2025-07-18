// eslint.config.js
import tseslint from "typescript-eslint";

export default [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Regras personalizadas
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-console": "warn",
      semi: ["error", "always"],
    },
  },
];
