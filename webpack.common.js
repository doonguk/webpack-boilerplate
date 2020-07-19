const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        // use의 경우 오른쪽에서 왼쪽으로 읽습니다.
        // 즉, css-loader를 적용 후 style-loader 적용
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        // css-loader: css 파일을 import 가능, css 파일을 읽어줌
        // style-loader: 읽은 css 코드를 head 태그안에 넣어줌
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      inject: true,
      filename: path.resolve(__dirname, "dist/index.html"),
    }),
  ],
};

module.exports = config;
