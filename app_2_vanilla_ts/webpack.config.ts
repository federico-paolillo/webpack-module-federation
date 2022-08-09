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
    port: 65534,
  },
  optimization: {
    chunkIds: "deterministic",
    runtimeChunk: "single",
    moduleIds: "deterministic",
    minimize: true,
    realContentHash: true,
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
      minify: true,
      scriptLoading: "blocking",
    }),
  ],
};

export default configuration;
