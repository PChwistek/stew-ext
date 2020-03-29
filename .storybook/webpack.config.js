const path = require('path');

// Export a function. Accept the base config as the only param.

var remotedev = require('remotedev-server')
remotedev({ hostname: 'localhost', port: 6888 })

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
    
  })

  config.externals = {
      ...config.externals,
      'jsdom': 'window',
      'cheerio': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'react/addons': true,
  }

  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      Assets: path.resolve(__dirname, '../src/assets'),
      Background: path.resolve(__dirname, '../src/containers/background'),
      Common: path.resolve(__dirname, '../src/containers/common-ui'),
      Popup: path.resolve(__dirname, '../src/containers/popup'),
      Containers: path.resolve(__dirname, '../src/containers')
    }
  }

  // Return the altered config
  return config;
};