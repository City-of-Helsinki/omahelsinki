const path = require("path");
const BundleTracker = require('webpack-bundle-tracker');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
      './assets/js/index'
  ],
  output: {
    path: path.resolve('./assets/bundles/'),
    filename: "[name]-[hash].js",
  },
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.LoaderOptionsPlugin({ options: {} }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
            {
                loader: require.resolve('eslint-loader'),
            },
        ],
        include: path.resolve('assets/js'),
      },
      // we pass the output from babel loader to react-hot loader
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      }
    ]
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  }
}
