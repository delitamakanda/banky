var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = require('./webpack.base.config.js');

config.entry = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './apps/static/js/index'
]

config.output.publicPath = 'http://localhost:3000/static/bundles/',

config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats.json'}),
    new ExtractTextPlugin('styles.[hash].css')
])

config.module.loaders.push(
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
    },
    {
        test: /\.css$/,
        // loaders: ['style-loader', 'css-loader',]
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    },
	{
    	test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    	loader: 'url-loader?limit=100000'
	}
)

module.exports = config
