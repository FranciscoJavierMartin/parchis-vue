/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    project: [
      './tsconfig.app.json',
      './tsconfig.node.json',
      './tsconfig.vitest.json',
      './tsconfig.json',
    ],
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
    'prefer-const': 'error',
    'vue/multi-word-component-names': 'warn',
    '@typescript-eslint/no-confusing-void-expression': 'error',
  },
};
