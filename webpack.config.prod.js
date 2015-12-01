const webpack = require('webpack')
const path = require('path')
const isLive = (process.env.NODE_ENV === 'production' | process.env.NODE_ENV === 'staging')

module.exports = {
    entry: "./app/app.jsx",

    output: {
        filename: "app.js",
        path: "./public/assets",
        publicPath: "/assets/"
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                loaders: ["babel?presets[]=airbnb"]
            }
        ],
    },

    plugins: [
        // Using webpack with shims and polyfills: http://mts.io/2015/04/08/webpack-shims-polyfills/
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],

}
