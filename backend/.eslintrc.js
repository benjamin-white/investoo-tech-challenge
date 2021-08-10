module.exports = {
  root: true,
  env: {
    es6: true,
  },
  extends: ['plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: ['prettier'],
  rules: {
    'no-debugger': 'warn',
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        singleQuote: true,
        semi: false,
        trailingComma: 'es5',
        bracketSpacing: true,
      },
    ],
  },
}
