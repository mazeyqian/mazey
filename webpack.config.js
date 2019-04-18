const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    test: './src/test.js',
  },
  devServer: {
    contentBase: './dist'
  },
  output: {
    libraryTarget: "umd",
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/test.html'),
      template: path.resolve(__dirname, 'src/test.html'),
      inject: true,
      chunksSortMode: 'dependency'
    }),
  ]
};
