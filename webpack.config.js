const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {

  entry: {
    app: "./app/app.jsx",
    vendor: "./styles/vendor.js",
    analytics: "./analytics/tracker.js"
  },

  output: {
    filename: "[name].js",
    path: "./public/assets",
    publicPath: "/assets/"
  },

  externals: {
      "jquery": "jQuery"
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
        loader: ExtractTextPlugin.extract(
            'style-loader',
            'css!sass?outputStyle=expanded'
            + '&includePaths[]=' + path.resolve(__dirname, './bower_components/foundation-sites/scss')
            + '&includePaths[]=' + path.resolve(__dirname, './bower_components/motion-ui/src')
        )
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },

    ],
  },

  plugins: [
    new ExtractTextPlugin('app.css', { allChunks: true }),

    // Using webpack with shims and polyfills: http://mts.io/2015/04/08/webpack-shims-polyfills/
    new webpack.ProvidePlugin({ 'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch' }),

    new webpack.DefinePlugin({
        PARSE_APP_ID: JSON.stringify(process.env.PARSE_APP_ID || "vcgh38EkiuIrke6l8pW30xokpp708lO07rR1CeqN"),
        PARSE_KEY: JSON.stringify(process.env.PARSE_KEY || "LZWollLVAf5rOTziIulxhIq4atdkN4k5TaKu7BJu"),
        GOOGLE_ANALYTICS_TRACKING_ID: JSON.stringify(process.env.GOOGLE_ANALYTICS_TRACKING_ID || "UA-71038246-1")
    })
  ],

  resolve: {
      root: path.resolve('./bower_components/foundation-sites/dist'),
      alias: {
        jquery: path.resolve('./bower_components/jquery/dist/jquery.js')
      }
  }

}
