const webpack = require('webpack')
const isLive = (process.env.NODE_ENV === 'production' | process.env.NODE_ENV === 'staging')
module.exports = {
  entry: "./app/app.jsx",

  output: {
    filename: "app.js",
    path: "./public"
  },

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
