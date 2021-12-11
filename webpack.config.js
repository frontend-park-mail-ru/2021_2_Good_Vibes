const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/main.ts",
  },
  // entry: './reworking/main.ts',
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".handlebars", ".scss"],
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.handlebars$/, use: "handlebars-loader" },
      { test: /\.hbs$/, use: "handlebars-loader" },
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.[hash].js",
    publicPath: "/",
    // path: path.resolve(__dirname, './reworking'),
    // filename: 'main_bundle.js',
  },
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Caching",
      template: "./src/index.html",
    }),
  ],
  devServer: {
    /* contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: true, */
    static: {
      directory: path.join(__dirname, "src"),
    },
    compress: true,
    port: 9000,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: true,
  },
};
