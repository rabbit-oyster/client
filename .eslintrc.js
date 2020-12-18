module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['standard', 'plugin:react/recommended', 'standard-react', 'standard-jsx'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'react/jsx-uses-vars': 'warn',
    'no-unused-vars': 'warn',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 'first'
      }
    ]
  }
}
