const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@c': path.resolve(__dirname, './src/'),
      '@c-component': path.resolve(__dirname, './src/components/index'),
      '@c-redux': path.resolve(__dirname, './src/redux/index')
    }
  }
}