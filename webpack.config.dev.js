const path = require("path");
const { rules } = require("./webpack.helper.js");

module.exports = {
  mode: "development",
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
};
