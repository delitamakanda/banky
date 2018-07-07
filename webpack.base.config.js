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
        rules: []
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },

    resolveLoader: {
        modules: ['node_modules', 'bower_components'],
    }
}
