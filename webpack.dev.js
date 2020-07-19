const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(commonConfig, {
  // 개발모드
  mode: "development",
  // debug tool을 정해줍니다.
  devtool: "inline-source-map",
  // dist의 빌드한 내용을 서버로 띄우겠다.

  devServer: {
    contentBase: "./dist",
    port: 9000,
    // 빌드 대상 파일이 변경되면 자동으로 브라우저를 새로고침
    hot: true,
  },
});
