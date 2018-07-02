const path = require("path");
const BundleTracker = require('webpack-bundle-tracker');


module.exports = {
  context: __dirname,
  entry: './assets/js/index',
  output: {
      path: path.resolve('./assets/bundles/'),
      filename: "[name]-[hash].js",
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    rules: [
      // we pass the output from babel loader to react-hot loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }], 
      }
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
}
