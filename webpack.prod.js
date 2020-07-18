const commonConfig = require('./webpack.common')

/** @type {import('webpack').Configuration} */
const prodConfig = {
  ...commonConfig,
  mode: 'production',
}

module.exports = prodConfig
