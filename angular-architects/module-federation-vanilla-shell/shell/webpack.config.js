const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/app.ts",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "auto",
    module: true,
    environment: {
      module: true
    }
  },
  optimization: {
    runtimeChunk: false
  },
  experiments: {
    outputModule: true,

  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      library: {type: 'module'},
      remotes: {
        mfe1: "http://localhost:4201/remoteEntry.js",
        mfe2: "http://localhost:4202/remoteEntry.js",
      }
    }),
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      scriptLoading: "module"    
    })
  ],
};