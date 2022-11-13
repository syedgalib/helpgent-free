const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production', // production | development
    watch: false,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/[name].min.css',
        }),
        new WebpackRTLPlugin({
            filename: '../css/[name].rtl.min.css',
            minify: true,
        }),
        new CleanWebpackPlugin({
            dry: false,
            cleanOnceBeforeBuildPatterns: ['../css/*.map', '../js/*.map'],
            dangerouslyAllowCleanPatternsOutsideProject: true,
        }),
        new FileManagerPlugin({
            events: {
                onEnd: [
                    {
                        copy: [
                            {
                                source: './app',
                                destination:
                                    './__build/helpgent/helpgent/app',
                            },
                            {
                                source: './assets',
                                destination:
                                    './__build/helpgent/helpgent/assets',
                            },
                            {
                                source: './helper',
                                destination:
                                    './__build/helpgent/helpgent/helper',
                            },
                            {
                                source: './languages',
                                destination:
                                    './__build/helpgent/helpgent/languages',
                            },
                            {
                                source: './vendor',
                                destination:
                                    './__build/helpgent/helpgent/vendor',
                            },
                            {
                                source: './view',
                                destination:
                                    './__build/helpgent/helpgent/view',
                            },
                            {
                                source: './*.php',
                                destination:
                                    './__build/helpgent/helpgent',
                            },
                            {
                                source: './*.txt',
                                destination:
                                    './__build/helpgent/helpgent',
                            },
                        ],
                    },
					{
                        delete: [
							'./__build/helpgent/helpgent/assets/css/*.map',
							'./__build/helpgent/helpgent/assets/js/*.map',
						],
                    },
                    {
                        archive: [
                            {
                                source: './__build/helpgent',
                                destination:
                                    './__build/helpgent.zip',
                            },
                        ],
                    },
                    {
                        delete: ['./__build/helpgent'],
                    },
                ],
            },
        }),
    ],
    optimization: {
        minimize: true,
    },
    output: {
        filename: '../js/[name].min.js',
    },
});
