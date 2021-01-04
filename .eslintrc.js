module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true
  },
  extends: 'eslint:recommended',
  globals: {
    __dirname: false,
    process: false
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    // 'no-console': 'off',
    indent: ['error', 2],
    'linebreak-style': 0, //['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
