const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['babel-polyfill', './public/scripts/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {loader: "style-loader"},
          {loader: "less-loader"},
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\??\#?v=[.0-9]+)?$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {loader: "babel-loader"}
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {loader: "babel-loader"}
      }
    ]
  }
};
