// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  files: ["**/*.ts", "**/*.vue"],
  rules: {
    "no-console": "off", // allow console.log in TypeScript files
    "vue/html-self-closing": "off", // allow non-self-closing tags
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^(_|props|emit)$",
        ignoreRestSiblings: true,
      },
    ],
  },
});
