var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    //watch: true,

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
        extensions: ['.js', '.jsx', '.css', '.scss']
    },

    resolveLoader: {
        modules: ['node_modules', 'bower_components'],
    }
}
