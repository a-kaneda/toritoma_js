const webpack = require("webpack");

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: './dest/toritoma.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};