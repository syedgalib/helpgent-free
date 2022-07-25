const path                 = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin         = require("terser-webpack-plugin");

module.exports = {
  entry: {
    // Core Module
    'core-public': '/src/modules/core/js/public/core-public.js',
    'core-admin': '/src/modules/core/js/admin/core-admin.js',

    // Messenger Module
    'messenger-public': '/src/modules/messenger/public/messenger-public.js',
    'messenger-admin': '/src/modules/messenger/admin/messenger-admin.js',

    // Chatbox Template Module
    'chatbox-template-admin': '/src/modules/chatboxTemplate/admin/chatbox-template-admin.js',
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
          loader: "file-loader",
          options: {
            outputPath: "../fonts",
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
      // Global
      Assets: path.resolve( __dirname, 'src/assets/' ),
      Helper: path.resolve( __dirname, 'src/helpers/' ),
      Components: path.resolve( __dirname, 'src/lib/components/' ),
      apiService: path.resolve( __dirname, 'src/lib/apiService/' ),

      // Core Module
      CoreModule: path.resolve( __dirname, 'src/modules/core/' ),
      CoreJS: path.resolve( __dirname, 'src/modules/core/js/' ),
      CoreCSS: path.resolve( __dirname, 'src/modules/core/sass/' ),

      // Messenger Module
      MessengerModule: path.resolve( __dirname, 'src/modules/messenger/' ),
      MessengerApps: path.resolve( __dirname, 'src/modules/messenger/apps/' ),

      // Chatbox Template Module
      ChatboxTemplateModule: path.resolve( __dirname, 'src/modules/chatboxTemplate/' ),
      ChatboxTemplateApps: path.resolve( __dirname, 'src/modules/chatboxTemplate/apps/' ),
    },
  },

  devtool: 'source-map',

  optimization: {
    minimize: true,
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