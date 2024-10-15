module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-native/all',
      'plugin:jsx-a11y/recommended',
      'airbnb',
      'plugin:prettier/recommended', // Enable Prettier rules
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react', 'react-native', 'jsx-a11y', 'import', 'prettier'],
    rules: {
      'prettier/prettier': ['error'], // Shows Prettier errors as ESLint errors
      'react/react-in-jsx-scope': 'off', // Since React 17, importing React is not necessary
      'react/prop-types': 'off', // If you're not using PropTypes
      'react-native/no-inline-styles': 'off', // Allow inline styles in React Native
    },
  };
  