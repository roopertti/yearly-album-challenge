const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const clientConfig = {
    target: 'web',
    entry: './src/client/index.tsx',
    output: {
        filename: 'client/bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};

module.exports = merge(baseConfig, clientConfig);