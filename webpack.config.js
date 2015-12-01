const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isLive = (process.env.NODE_ENV === 'production' | process.env.NODE_ENV === 'staging')

const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?'
    + '&includePaths[]=' + path.resolve(__dirname, './bower_components/foundation-sites/scss')
    // + '&includePaths[]=' + path.resolve(__dirname, './bower_components/motion-ui/src')
];

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
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader!css-loader')
      }

    ],
  },

  plugins: [

    new ExtractTextPlugin(path.resolve(__dirname, 'public/___.css'), {
        allChunks: true
    }),

    // Using webpack with shims and polyfills: http://mts.io/2015/04/08/webpack-shims-polyfills/
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],

  resolve: {
      extensions: ['', '.js', '.jsx', '.scss'],
      modulesDirectories: ['app', 'node_modules', 'bower_components']
  }

}
