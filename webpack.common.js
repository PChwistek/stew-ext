const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    background: './src/containers/background/background.js',
    popup: './src/containers/popup/',
    dashboard: './src/containers/dashboard/'
  },
  output: {
    filename: '[name]/[name].js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: './src/manifest.json', to: './manifest.json' },
      { from: './src/assets', to: './assets' }
    ]),
    new HtmlWebpackPlugin({
      title: 'Popup - hermitly',
      template: 'src/public/popup.html',
      filename: 'popup/popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      title: 'Dashboard - hermitly',
      template: 'src/public/dashboard.html',
      filename: 'dashboard/dashboard.html',
      chunks: ['dashboard']
    })
  ],
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx'
    ]
  }
}