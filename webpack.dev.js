const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'development',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
    ],
    output: {
        publicPath: 'http://localhost:3000/assets/bundles/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
    // new BundleAnalyzerPlugin(),
    ],
    module: {
        rules: [
            // we pass the output from babel loader to react-hot loader
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        plugins: ['react-hot-loader/babel'],
                    },
                }],
            },
        ],
    },

    devServer: {
        port: 3000,
        //host: "localhost",
        hot: true,
        inline: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
});
