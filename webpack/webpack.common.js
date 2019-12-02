/* eslint-disable prefer-object-spread */
const path    = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const pkg = require('../package.json');

const CONSTANTS = {
    PATHS: {
        ROOT:         path.join(__dirname, '..'),
        SRC:          path.join(__dirname, '../src'),
        BUILD:        path.join(__dirname, '../build'),
        PUBLIC:       path.join(__dirname, '../public'),
        NODE_MODULES: path.join(__dirname, '../node_modules'),
    },
};

const withCommonConfig = options => Object.assign({}, options, {
    mode: process.env.NODE_ENV,

    output: Object.assign(
        {
            publicPath: '/',
            path:       CONSTANTS.PATHS.BUILD,
        },
        options.output,
    ),

    module: {
        rules: [
            {
                test:    /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
                exclude: /node_modules/,
                loader:  'babel-loader',
            },
            {
                test: /\.scss$/,
                use:  ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.css/,
                use:  ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test:    /\.svg$/,
                exclude: [/\.url\.svg$/],
                use:     [
                    'babel-loader',
                    {
                        loader:  'react-svg-loader',
                        options: {
                            jsx: true, // true outputs JSX tags
                        },
                    },
                ],
            },
            {
                test: /\.url\.svg$/,
                use:  [
                    {
                        loader:  'svg-url-loader',
                        options: {
                            // Inline files smaller than 10 kB
                            limit:    10 * 1024,
                            noquotes: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use:  [
                    {
                        loader:  'url-loader',
                        options: {
                            // Inline files smaller than 10 kB
                            limit: 10 * 1024,
                        },
                    },
                    {
                        loader:  'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                enabled: false,
                                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                                // Try enabling it in your environment by switching the config to:
                                // enabled: true,
                                // progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed:   4,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(eot|otf|ttf|woff|woff2)$/,
                use:  'file-loader',
            },
        ],
    },

    plugins: options.plugins.concat([
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; Terser will automatically
        // drop any unreachable code.
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
        new WebpackNotifierPlugin({
            title:                 pkg.name,
            contentImage:          `${ CONSTANTS.PATHS.PUBLIC }/webpack-notifier-logo.png`,
            excludeWarnings:       true,
            alwaysNotify:          true,
            skipFirstNotification: false,
        }),
    ]),

    resolve: {
        modules:    [CONSTANTS.PATHS.SRC, CONSTANTS.PATHS.NODE_MODULES],
        extensions: ['.js', '.jsx', '.scss', '.react.js'],
        mainFields: ['browser', 'jsnext:main', 'main'],
    },
});

module.exports = {
    CONSTANTS,
    withCommonConfig,
};
