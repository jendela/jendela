var webpack = require('webpack')

module.exports = {
  context: __dirname + "/app",
  entry: "./app.jsx",

  output: {
    filename: "app.js",
    path: __dirname + "/public"
  },

  // Using webpack with shims and polyfills: http://mts.io/2015/04/08/webpack-shims-polyfills/
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  //   })
  // ],

  module: {
    loaders: [
      {
        test: [/\.jsx$/, /\.js$/],
        exclude: [/node_modules/],
        loaders: ["react-hot", "babel?presets[]=airbnb"]
      }
    ],
  },

}
