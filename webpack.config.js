const webpack = require('webpack')
const isLive = (process.env.NODE_ENV === 'production' | process.env.NODE_ENV === 'staging')

module.exports = {
  entry: "./app/app.jsx",

  output: {
    filename: "app.js",
    path: "./public/assets",
    publicPath: "/assets/"
  },

  plugins: [
    // Using webpack with shims and polyfills: http://mts.io/2015/04/08/webpack-shims-polyfills/
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],

  module: {
    loaders: [
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: [/node_modules/],
        loaders: (isLive ? ["babel?presets[]=airbnb"] : ["react-hot", "babel?presets[]=airbnb"])
      }
    ],
  },

}
