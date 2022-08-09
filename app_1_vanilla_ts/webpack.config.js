const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./src/main.ts",
  mode: "development",
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist/"),
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
  devServer: {
    port: 65535,
  },
  devtool: "eval-source-map",
  plugins: [
    new Webpack.container.ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      exposes: {
        "./garbage-div": "./src/garbage-div",
      },
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
};
