const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname , '..', 'src'),
  devtool: 'source-map',
  entry: { main: './index.js' },
  output: {
    path: path.resolve(__dirname , '..', 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
      { test: /\.scss$/, exclude: /node_modules/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './resources/index.html' }),
    new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[id].css" })
  ]
};
