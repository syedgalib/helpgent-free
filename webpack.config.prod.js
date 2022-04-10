const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const { rules } = require("./webpack.helper.js");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/js/main.js",
    admin: "./src/js/admin.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "assets/js"),
  },
  module: {
    rules: [rules.js, rules.img, rules.css, rules.sass],
  },
  optimization: {
    // remove comments from js
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};