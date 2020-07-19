module.exports = function (api) {
  api.cache(true); // plugin & preset을 캐싱하여 다시 실행하지 않음

  const presets = [
    [
      "@babel/preset-env", // 필수적인 플러그인이 모여있음
      {
        targets: "> 1%, not dead",
        // 원하는 브라우저의 범위를 정함
        // not dead: 보안 업데이트를 하는 브라우저를 지원
        useBuiltIns: "usage", // entry: 모든 polyfill이 추가, usage: 필요한 polyfill을 import해서 사용
        corejs: 3,
        modules: false, // ES6 Module System 사용
      },
    ],
  ];

  const plugins = [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          imgs: "./public/images",
        },
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
