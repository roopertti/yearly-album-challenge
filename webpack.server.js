const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const serverConfig = {
    target: 'node',
    entry: './src/server.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: [nodeExternals()]
};

module.exports = merge(baseConfig, serverConfig);