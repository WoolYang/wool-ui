const webpack = require('webpack');
const path = require('path');
const Nyan = require('nyan-progress-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const WebpackDevMiddleware = require("webpack-dev-middleware");
const openBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: './examples/lib/index.tsx',
    output: {
        path: path.resolve(__dirname, 'examples/lib'),
        filename: 'bundle.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            components: path.resolve(__dirname, 'src/components')
        }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader",
            exclude: /node_modules/
        }, {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader",
            exclude: /node_modules/
        }, {
            test: /\.(jsx|js)?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.(less|css)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'less-loader'
            }]
        }]
    },
    devServer: {
        contentBase: "./examples",
        historyApiFallback: true,
        inline: true
    },
    plugins: [
        new Nyan(),
        new webpack.HotModuleReplacementPlugin(),
        new openBrowserPlugin({
            url: 'http://localhost:8080'
        })
    ]
};