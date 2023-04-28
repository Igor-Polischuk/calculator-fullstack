const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");

const path = require("path");

const { NODE_ENV = "production" } = process.env;

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  watch: isDev,
  entry: "./src/app.ts",
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
  plugins: [new NodemonPlugin(), new DotenvWebpackPlugin()],
  externals: [nodeExternals()],
};
