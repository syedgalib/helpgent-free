const path                 = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin         = require("terser-webpack-plugin");

module.exports = {
  entry: {
    // Core Module
    'core-public': '/src/js/public/core-public.js',
    'core-admin': '/src/js/admin/core-admin.js',

    // Messenger Module
    'messenger-public': '/src/js/public/messenger-public.js',
    'messenger-admin': '/src/js/admin/messenger-admin.js',

    // Chatbox Template Module
    'chatbox-template-admin': '/src/js/admin/chatbox-template-admin.js',

    // Settings Panel Module
    'settings-panel-admin': '/src/js/admin/settings-panel-admin.js',
  },

  output: {
    filename: "[name].js",
    path: path.resolve( __dirname, "assets/js" ),
  },

  module: {
    rules: [
      // Loading Videos
      {
        test: /\.(mp4)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "../videos",
            },
          },
        ],
      },
      // Loading Images
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "../images",
            },
          },
        ],
      },
      // Loading Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            // name: '[name].[ext]',
            // outputPath: "../fonts",
          },
        },
      },
      // Loading JS
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [ "babel-loader" ]
      },
      // Loading SASS
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      Assets: path.resolve( __dirname, 'src/assets/' ),
      SCSS: path.resolve( __dirname, 'src/scss/' ),

      Apps: path.resolve( __dirname, 'src/js/apps/' ),
      Components: path.resolve( __dirname, 'src/js/components/' ),

      Helper: path.resolve( __dirname, 'src/js/helpers/' ),
      Hooks: path.resolve( __dirname, 'src/js/helpers/hooks/' ),
      API: path.resolve( __dirname, 'src/js/helpers/hooks/api/' ),
	  Externals: path.resolve( __dirname, 'src/js/helpers/externals/' ),
	  Reducers: path.resolve( __dirname, 'src/js/helpers/reducers/' ),
      apiService: path.resolve( __dirname, 'src/js/helpers/apiService/' ),

	  Lib: path.resolve( __dirname, 'src/js/lib/' ),
    },
  },

  devtool: 'source-map',

  optimization: {
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