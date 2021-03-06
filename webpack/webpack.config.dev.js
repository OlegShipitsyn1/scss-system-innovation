const Path = require("path");
const Webpack = require("webpack");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  target: "web",
  watch: true,
  mode: "development",
  devtool: "eval-cheap-source-map",
  output: {
    chunkFilename: "js/[name].chunk.js",
  },
  devServer: {
    inline: true,
    hot: true,
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, "../src"),
        loader: "babel-loader",
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.s?[c,a]ss$/i,
        use: [
          "style-loader",
          "css-loader?sourceMap=true",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
});
