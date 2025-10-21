import { FlatCompat } from "@eslint/eslintrc";
import stylistic from '@stylistic/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import perfectionist from 'eslint-plugin-perfectionist'
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "bun.lock",
      ".DS_Store",
      "*.log",
      ".eslintcache",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      '@stylistic': stylistic,
      'perfectionist': perfectionist,
    },
    rules : {
      "@typescript-eslint/no-shadow": [2, { "ignoreTypeValueShadow": false }],
      "curly": 2,
      "default-case": 2,
      "default-case-last": 2,
      "default-param-last": 2,
      "dot-notation": 2,
      "eqeqeq": 2,
      "func-name-matching": 2,
      "func-names": 2,
      "grouped-accessor-pairs": [2, "getBeforeSet"],
      "guard-for-in": 2,
      "id-length": [2, { "exceptions": ["_", "x", "y", "z"] }],
      "import/default": 2,
      "import/export": 2,
      "import/newline-after-import": 2,
      "import/no-dynamic-require": 2,
      "import/no-unresolved": 0,
      "import/no-useless-path-segments": 2,
      "import/prefer-default-export": 0,
      "import/consistent-type-specifier-style": [2, "prefer-top-level"],
      "jsx-a11y/anchor-is-valid": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/label-has-associated-control": 0,
      "jsx-a11y/mouse-events-have-key-events": 0,
      "jsx-a11y/no-noninteractive-element-interactions": 0,
      "jsx-a11y/no-static-element-interactions": 0,
      "jsx-a11y/media-has-caption": 0,
      "line-comment-position": [2, { "position": "above" }],
      "max-statements": [2, { "max": 10 }],
      "new-cap": [2, { "capIsNewExceptions": ["Inter"] }],
      "no-array-constructor": 2,
      "no-bitwise": 2,
      "no-caller": 2,
      "no-console": [
        1,
        {
          "allow": ["warn", "error"]
        }
      ],
      "no-constructor-return": 2,
      "no-else-return": 2,
      "no-eval": 2,
      "no-extend-native": 2,
      "no-extra-bind": 2,
      "no-extra-label": 2,
      "no-iterator": 2,
      "no-label-var": 2,
      "no-lonely-if": 2,
      "no-multi-assign": 2,
      "no-multi-str": 2,
      "no-nested-ternary": 0,
      "no-new-func": 2,
      "no-nonoctal-decimal-escape": 2,
      "@stylistic/padding-line-between-statements": [
        2,
        {
          "blankLine": "always",
          "prev": "block-like",
          "next": "*"
        }
      ],
      "no-octal-escape": 2,
      "no-param-reassign": 2,
      "no-plusplus": 2,
      "no-proto": 2,
      "no-restricted-globals": [
        2,
        { "name": "event", "message": "Use local parameter instead." },
        {
          "name": "name",
          "message": "Usage of global name instead of name prop. This is probably an error"
        }
      ],
      "no-script-url": 2,
      "no-self-compare": 2,
      "no-sequences": 2,
      "no-shadow": 0,
      "no-template-curly-in-string": 2,
      "no-throw-literal": 2,
      "no-undef-init": 2,
      "no-undef": 2,
      "no-undefined": 0,
      "no-underscore-dangle": 0,
      "no-unmodified-loop-condition": 2,
      "no-unneeded-ternary": 2,
      "no-unreachable-loop": 2,
      "no-use-before-define": 0,
      "no-useless-rename": 2,
      "no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ],
      "no-var": 2,
      "no-warning-comments": 1,
      "one-var": [2, "never"],
      "prefer-arrow-callback": 2,
      "prefer-const": 1,
      "prefer-destructuring": 2,
      "prefer-exponentiation-operator": 2,
      "prefer-named-capture-group": 2,
      "prefer-object-spread": 2,
      "prefer-rest-params": 2,
      "prefer-spread": 1,
      "prefer-template": 2,
      "radix": 2,
      "react-hooks/exhaustive-deps": 1,
      "react-hooks/rules-of-hooks": 2,
      "react/boolean-prop-naming": [
        1,
        {
          "rule": "^(is|has)[A-Z]([A-Za-z0-9]?)+"
        }
      ],
      "react/button-has-type": 0,
      "react/function-component-definition": [
        "error",
        {
          "namedComponents": "arrow-function",
          "unnamedComponents": "arrow-function"
        }
      ],
      "react/jsx-boolean-value": [2, "never"],
      "react/jsx-closing-bracket-location": [2, "tag-aligned"],
      "react/jsx-equals-spacing": [2, "never"],
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [".js", ".tsx"]
        }
      ],
      "react/jsx-key": 1,
      "react/jsx-first-prop-new-line": [2, "multiline"],
      "react/jsx-no-duplicate-props": 2,
      "react/jsx-one-expression-per-line": 0,
      "react/jsx-pascal-case": 2,
      "react/jsx-props-no-spreading": 0,
      "react/jsx-sort-props": 2,
      "react/no-array-index-key": 0,
      "react/no-deprecated": 1,
      "react/no-did-update-set-state": 0,
      "react/no-direct-mutation-state": 1,
      "react/no-string-refs": 1,
      "react/no-typos": 2,
      "react/require-default-props": 0,
      "react/self-closing-comp": 1,
      "strict": 0,
      "unicorn/filename-case": 0,
      "unicorn/new-for-builtins": 0,
      "unicorn/no-null": 0,
      "unicorn/prevent-abbreviations": 0,
      "use-isnan": 2,
      "perfectionist/sort-imports": 2
    }
  },
  // TypeScript-specific rules for .ts and .tsx files
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      'perfectionist': perfectionist,
    },
    rules: {
      "@typescript-eslint/array-type": [2, { "default": "array" }],
      "@typescript-eslint/consistent-type-definitions": [2, "interface"],
      "@typescript-eslint/consistent-type-exports": 2,
      "@typescript-eslint/consistent-type-imports": [
        2,
        {
          "prefer": "type-imports",
          "fixStyle": "separate-type-imports"
        }
      ],
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/member-ordering": 2,
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": 2,
      "@typescript-eslint/no-unnecessary-condition": 2,
      "@typescript-eslint/no-unnecessary-type-arguments": 2,
      "@typescript-eslint/no-unnecessary-type-assertion": 2,
      "@typescript-eslint/non-nullable-type-assertion-style": 2,
      "@typescript-eslint/no-restricted-types": [
        2,
        {
          "types": {
            "FC": "Useless and has some drawbacks use ({ ...}: IProps) => instead",
            "React.FC": "Useless and has some drawbacks use ({ ...}: IProps) => instead",
            "React.FunctionComponent": "Useless and has some drawbacks use ({ ...}: IProps) => instead",
            "React.FunctionalComponent": "Useless and has some drawbacks use ({ ...}: IProps) => instead"
          }
        }
      ],
      "@typescript-eslint/prefer-nullish-coalescing": 2,
      "@typescript-eslint/prefer-optional-chain": 2,
      "@typescript-eslint/prefer-string-starts-ends-with": 2,
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "prefix": ["I"]
        },
        {
          "selector": "typeAlias",
          "format": ["PascalCase"]
        }
      ],
      "react/prop-types": "off"
    }
  },
  // App-specific rules for src/app/**/*.tsx files
  {
    files: ["src/app/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": [0]
    }
  }
];

export default eslintConfig;
