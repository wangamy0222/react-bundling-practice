const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Node.js - os 모듈 불러오기
const os = require("os");
// CssMinimizerPlugin 모듈 불러오기
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "/docs"),
    filename: "[name].bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    // 압축
    minimize: isDevMode ? false : true,
    // 미니마이저
    minimizer: [
      // 플러그인 인스턴스 생성
      new CssMinimizerPlugin({
        // CPU 멀티 프로세서 병렬화 옵션 (기본 값: true)
        parallel: os.cpus().length - 1,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};
