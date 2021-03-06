module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['google', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error'],
    'no-invalid-this': 0,
  },
};
