const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./src/main.js",
  mode: "development",
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist/"),
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.ts$/,
  //       loader: "ts-loader",
  //     },
  //   ],
  // },
  devServer: {
    port: 65534,
  },
  devtool: "eval-source-map",
  plugins: [
    new Webpack.container.ModuleFederationPlugin({
      name: "app2",
      remotes: {
        app1: "app1@http://localhost:65535/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
};
