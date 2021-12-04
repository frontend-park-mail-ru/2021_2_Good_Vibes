const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  // entry: './reworking/main.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.handlebars', '.scss'],
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.handlebars$/, use: 'handlebars-loader' },
      { test: /\.hbs$/, use: 'handlebars-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main_bundle.js',

    // path: path.resolve(__dirname, './reworking'),
    // filename: 'main_bundle.js',
  },
  mode: 'production',
};
