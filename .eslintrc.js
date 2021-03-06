module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    "no-use-before-define": ["error", {
      "functions": false,
      "classes": false,
      "variables": false,
    }],
  },
};
