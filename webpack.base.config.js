var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,

    entry: './apps/static/js/index',

    output: {
        path: path.resolve('./apps/static/bundles/'),
        filename: '[name]-[hash].js',
    },

    plugins: [
        //
    ],

    module: {
        loaders: []
    },

    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx', '.css']
    },
}
