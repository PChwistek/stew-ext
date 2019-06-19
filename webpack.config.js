const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    background: './src/background/background.js',
    popup: './src/popup/popup.js',
    dashboard: './src/dashboard/dashboard.js',
    shared: './src/shared/shared.js'
  },
  output: {
    filename: '[name]/[name].js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          // Fallback to style-loader in development
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx'
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Popup - hermitly',
      template: 'src/popup/popup.html',
      filename: 'popup/popup.html',
      chunks: ['popup', 'shared']
    }),
    new HtmlWebpackPlugin({
      title: 'Dashboard - hermitly',
      template: 'src/dashboard/dashboard.html',
      filename: 'dashboard/dashboard.html',
      chunks: ['dashboard', 'shared']
    }),
    new CopyWebpackPlugin([
      { from: './src/manifest.json', to: './manifest.json' },
      { from: './src/assets', to: './assets' }
    ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
