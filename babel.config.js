module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env", // 필수적인 플러그인이 모여있음
      {
        targets: { ie: "11" },
        useBuiltIns: "usage", // entry: 모든 polyfill이 추가, usage: 필요한거추가
        corejs: "3",
        modules: false,
        // targets: "> 1%, not dead", // 원하는 브라우저의 범위를 정함
      },
    ],
  ];

  return {
    presets,
  };
};
