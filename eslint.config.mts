import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import { defineConfig } from "eslint/config";
import gitignore from "eslint-config-flat-gitignore";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    // Ignores files specified in gitignore
    gitignore(),

    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        ignores: ["backend/dist/*"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: "latest", // или 2021, 2022, 2023
            },
        },
    },
    {
        files: ["**/*.json"],
        ignores: ["package-lock.json", "*/package-lock.json"],
        plugins: { json },
        language: "json/json",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.jsonc"],
        plugins: { json },
        language: "json/jsonc",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.md"],
        plugins: { markdown },
        language: "markdown/gfm",
        extends: ["markdown/recommended"],
    },

    // TypeScript linter and parser
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
        extends: [
            tseslint.configs.recommendedTypeChecked,
            {
                rules: {
                    "@typescript-eslint/no-explicit-any": "off",
                    "@typescript-eslint/no-floating-promises": "warn",
                    "@typescript-eslint/no-unsafe-argument": "warn",
                    "prettier/prettier": ["error", { endOfLine: "auto" }],
                },
            },
            {
                // temp disabled rules for create project basics
                rules: {
                    "@typescript-eslint/no-unsafe-return": "warn",
                    "@typescript-eslint/no-unsafe-call": "warn",
                    "@typescript-eslint/no-unsafe-member-access": "warn",
                    "@typescript-eslint/require-await": "warn",
                    "@typescript-eslint/no-unused-vars": "warn",
                    "@typescript-eslint/no-unsafe-assignment": "warn",
                },
            },
        ],
    },
    // TypeScript import path resolver for backend
    {
        files: ["backend/**/*.ts", "backend/**/*.tsx"],
        settings: {
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: "./backend/tsconfig.json",
                },
            },
        },
    },

    // Vue linter rules
    {
        files: ["**/*.vue", "frontend/**/*.ts"],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
        extends: [
            pluginVue.configs["flat/essential"],
            {
                rules: {
                    "no-restricted-imports": [
                        "error",
                        {
                            patterns: [
                                {
                                    group: ["../*"],
                                    message:
                                        'Instead of the parent directory characters "../", the file path relative to the src directory should be used, using "@" character.',
                                },
                            ],
                        },
                    ],
                },
            },
        ],
        // TypeScript import path resolver for frontend
        settings: {
            // Path resolver
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: "./frontend/tsconfig.json",
                },
            },
        },
    },

    // vvvv General liner rules vvvv

    // Config from eslint-plugin-prettier
    eslintPluginPrettierRecommended,

    {
        rules: {
            "dot-notation": ["error"],
            "arrow-body-style": ["error", "as-needed"],
            "prefer-const": ["error", { destructuring: "all" }],
        },
    },

    // eslint-plugin-import setup and rules
    importPlugin.flatConfigs.recommended,
    {
        files: ["**/*.{ts}"],
        ignores: ["eslint.config.mts"],
        extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    },

    // Import rules
    {
        rules: {
            "import/extensions": [
                "error",
                "always",
                {
                    js: "never",
                    ts: "never",
                },
            ],
            "import/newline-after-import": "error",
            "import/no-duplicates": "error",
            "import/order": [
                "error",
                {
                    groups: [
                        // builtin is core Node.js modules import
                        "builtin",
                        /* 
                        external is import:
                            - from outside the project root
                            - from node_modules
                            - scoped package (e.g. @scope-name/package-name)
                            - start with letter
                        */
                        "external",
                        // internal is import from inside the project root
                        "internal",
                        // sibling is import from parent directory or its subdirectory
                        "sibling",
                        // index is import that is one of [".", "./", "./index", "./index.js"]
                        "parent",
                        // sibling is import from same directory or subdirectory
                        "index",
                        // object is import that is part of an arcane TypeScript declaration, (e.g. import log = console.log)
                        "object",
                        // type is import that is type-only
                        "type",
                    ],
                    pathGroups: [
                        /*
                        Web-sites to help with minimatch:
                            - minimatch cheat sheet - https://github.com/motemen/minimatch-cheat-sheet
                            - minimatch testing field - https://pthrasher.github.io/minimatch-test/
                        */
                        // Import from src directory without file extension at the end
                        {
                            pattern: "*/**/!(*.*)",
                            group: "parent",
                            position: "before",
                        },
                        // Import from src directory with file extension at the end
                        {
                            pattern: "*/**/*.*",
                            group: "parent",
                            position: "after",
                        },
                    ],
                    "newlines-between": "always",
                    alphabetize: {
                        order: "asc",
                        orderImportKind: "asc",
                    },
                    named: { enabled: true },
                    warnOnUnassignedImports: true,
                },
            ],
        },
    },
    // ^^^^ General liner rules ^^^^

    // Disable import check for eslint.config.mts
    {
        files: ["eslint.config.mts"],
        rules: {
            "import/no-unresolved": "off",
            "import/extensions": "off",
            "import/namespace": "off",
            "import/default": "off",
            "import/no-named-as-default": "off",
            "import/no-named-as-default-member": "off",
        },
    },
]);
