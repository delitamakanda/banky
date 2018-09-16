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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    }),
    new ExtractTextPlugin('styles.[hash].css')
])

config.module.rules.push(
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
    },
    {
        test:/\.(s*)css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader','sass-loader']
        })
    },
    {
    	test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [{
           loader: 'url-loader',
           options: {
               limit: 8000,
               name: 'images/[hash]-[name].[ext]'
           }
       }]
	}
)

module.exports = config
