const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        // use의 경우 오른쪽에서 왼쪽으로 읽음.
        // sass -> css -> MiniCssExtract
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        // css-loader: css 파일을 import 가능, css 파일을 읽어줌
        // style-loader: 읽은 css 코드를 head 태그안에 넣어줌
        // MiniCssExtractPlugin은 style code를 한가지 css파일로 묶어줌
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // useRelativePath: true,
              name: "images/[name].[ext]?[hash]",
              // publicPath: "./dist/",
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      inject: true,
      filename: path.resolve(__dirname, "dist/index.html"),
    }),
    new CleanWebpackPlugin({ filename: "build.js" }),
  ],
};

module.exports = config;
