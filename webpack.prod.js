const common    = require("./webpack.common");
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin   = require("mini-css-extract-plugin");
const WebpackRTLPlugin       = require("webpack-rtl-plugin");
const FileManagerPlugin      = require('filemanager-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: "production", // production | development
  watch: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/[name].min.css",
    }),
    new WebpackRTLPlugin({
      filename: "../css/[name].rtl.min.css",
      minify: true,
    }),
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: [ '../css/*.map', '../js/*.map' ],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new FileManagerPlugin({
      events: {
        onEnd: [
          {
            copy: [
              { source: './app', destination: './__build/wpwax-video-message/wpwax-video-message/app' },
              { source: './assets', destination: './__build/wpwax-video-message/wpwax-video-message/assets' },
              { source: './helper', destination: './__build/wpwax-video-message/wpwax-video-message/helper' },
              { source: './languages', destination: './__build/wpwax-video-message/wpwax-video-message/languages' },
              { source: './vendor', destination: './__build/wpwax-video-message/wpwax-video-message/vendor' },
              { source: './view', destination: './__build/wpwax-video-message/wpwax-video-message/view' },
              { source: './*.php', destination: './__build/wpwax-video-message/wpwax-video-message' },
              { source: './*.txt', destination: './__build/wpwax-video-message/wpwax-video-message' },
            ],
          },
          {
            archive: [
              { source: './__build/wpwax-video-message', destination: './__build/wpwax-video-message.zip' },
            ],
          },
          {
            delete: ['./__build/wpwax-video-message'],
          },
        ],
      },
    }),
  ],
  optimization: {
    minimize: true,
  },
  output: {
    filename: "../js/[name].min.js",
  },
});