const rules = {
  js: {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
      },
    },
  },
  img: {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loader: "file-loader",
    options: {
      outputPath: "../img/react",
    },
  },
  css: {
    test: /\.css$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: false,
        },
      },
    ],
  },
  sass: {
    test: /\.scss$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: false,
        },
      },
      "sass-loader",
    ],
  },
};

module.exports = { rules };
