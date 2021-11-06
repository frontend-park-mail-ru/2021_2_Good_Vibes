const path = require('path');

module.exports = {
  // entry: './public/main.js',
  entry: './public-ts/main.ts',
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', '.handlebars'],
    // alias: {
    //   // template: `${__dirname}/src/templates`,
    //   template: `${__dirname}/hood`,
    // },
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.handlebars$/, use: 'handlebars-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  output: {
    // path: path.resolve(__dirname, './public/bundle'),
    path: path.resolve(__dirname, './public-ts/bundle'),
    filename: 'main_bundle.js',
  },
  mode: 'production',
};
