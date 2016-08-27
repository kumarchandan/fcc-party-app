// webpack.config.js

const webpack = require('webpack');

module.exports = {
    entry: {
        Index: './src/index.js'
    },
    output: {
        path: './public',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         minimize: true,
    //         compress: {
    //             warnings: false
    //         },
    //         output: {
    //             comments: false
    //         }
    //     })
    // ]
}