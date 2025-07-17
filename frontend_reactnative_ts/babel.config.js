module.exports = function (api) {
  console.log("✅ Babel config loaded");
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: ['nativewind/babel'],
    };
  };
  