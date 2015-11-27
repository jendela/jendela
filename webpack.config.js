const webpack = require('webpack')
const isLive = (process.env.NODE_ENV === 'production' | process.env.NODE_ENV === 'staging')
module.exports = {
  context: __dirname + "/app",
  entry: "./app.jsx",

  output: {
    filename: "app.js",
    path: __dirname + "/public"
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
