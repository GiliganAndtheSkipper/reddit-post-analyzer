import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.config({
    // Extend recommended rules and React plugin's recommended rules
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],

    // Use Babel parser for modern JavaScript and JSX
    parser: '@babel/eslint-parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },

    // Plugins for React linting
    plugins: ['react'],

    // React-specific settings (like auto-detecting React version)
    settings: {
      react: {
        version: 'detect',  // Automatically detect the installed React version
      },
    },

    // Custom rules, including disabling React-in-JSX-scope rule
    rules: {
      'react/react-in-jsx-scope': 'off',  // Disable rule for React 17+ JSX transform
    },
  }),
];
