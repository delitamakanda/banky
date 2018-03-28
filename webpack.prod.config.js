var webpack = require('webpack');
var path = require('path');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = require('./webpack.base.config.js');

config.output.path = path.resolve('./apps/static/dist')

config.plugins = config.plugins.concat([
    new BundleTracker({filename: './webpack-stats-prod.json'}),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    }),
    new ExtractTextPlugin('styles.[hash].css')
])

config.module.loaders.push(
    {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/antd)/,
        loader: 'babel'
    },
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader')
    },
	{
    	test: /\.(ttf|eot|woff|woff2|svg)$/,
    	loader: 'url-loader?limit=50000&name=fonts/[name].[ext]'
	}
)

module.exports = config
