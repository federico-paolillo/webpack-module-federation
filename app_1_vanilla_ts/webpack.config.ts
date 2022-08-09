import { Configuration } from "webpack";
import * as Webpack from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

const configuration: Configuration & DevServerConfiguration = {
  entry: "./src/main.ts",
  mode: "development",
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].[contenthash].js",
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
  optimization: {
    //Attempting to mess with chunkIds, moduleIds and runtime messes with federation
    minimize: true,
    realContentHash: true,
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

export default configuration;
