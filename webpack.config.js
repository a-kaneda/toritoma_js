const webpack = require("webpack");

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: './dest/toritoma.js'
    },
    module: {
        loaders: [
            { test: '/\.html$/', loader: 'html?minize' }
        ]
    },
//    plugins: [
//        new webpack.optimize.UglifyJsPlugin()
//    ],
    devServer: {
        contentBase: 'dest',
        host: '0.0.0.0',
        disableHostCheck: true
    }
};
