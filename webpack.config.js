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
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats.json'})
])

config.module.rules.push(
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader', 'babel-loader']
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader',]
    },
	{
    	test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    	use: 'url-loader?limit=100000'
	}
)

module.exports = config
