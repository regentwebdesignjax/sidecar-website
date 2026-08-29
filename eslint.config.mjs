import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // AppleDouble sidecar files: this project lives on an exFAT volume, which
    // shadows every file with a binary "._name" companion.
    "**/._*",
  ]),
  {
    rules: {
      /**
       * Copy on this site is edited directly through GitHub's web editor, not
       * only in an IDE. That rule wants every apostrophe written as `&apos;`,
       * which makes prose materially harder to write and read in a browser
       * textarea, and it breaks the lint gate every time a sentence with a
       * contraction is added.
       *
       * React escapes text nodes on render either way, so this is purely
       * stylistic — there is no XSS or correctness argument for it. Both
       * spellings already appear in the codebase and render identically.
       */
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
