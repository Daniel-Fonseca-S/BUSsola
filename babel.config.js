module.exports = function (api) {
  api.cache(true);
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          "@components": "./src/components",
        }
      }
    ]
  ]
  return {
    presets: ['babel-preset-expo'],
  };
};
