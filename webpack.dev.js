const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/client/index.js'), // Entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Clean the output directory before building
  },
  mode: 'development', // Set mode to development
  devtool: 'eval-source-map', // Enable source maps for debugging
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'], // Transpile JS using Babel
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // Process SCSS files
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.scss'], // Resolve these extensions
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/client/views/index.html'), // HTML template path
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), // Serve content from the dist directory
    },
    compress: true, // Enable gzip compression
    port: 3001, // Use port 3001 for the dev server
    hot: true, // Enable hot module replacement
    open: true, // Automatically open the browser
  },
};

// Log paths for debugging
console.log("Entry Path:", path.resolve(__dirname, 'src/client/index.js'));
console.log("Template Path:", path.resolve(__dirname, 'src/client/views/index.html'));
