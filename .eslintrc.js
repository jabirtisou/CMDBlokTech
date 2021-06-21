module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 120,
        tabWidth: 4,
      },
    ],
  },
};
