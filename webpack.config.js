var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

var config = require('./webpack.base.config.js');

config.entry = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './apps/static/js/index'
]

config.output.publicPath = 'http://localhost:3000/static/bundles/';

config.mode = 'development'

config.plugins = config.plugins.concat([
    new webpack.NamedModulesPlugin(),
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
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
    },
	{
    	test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [{
           loader: 'url-loader',
           options: {
               limit: 8000,
               name: '[hash]-[name].[ext]'
           }
       }]
	}
)

module.exports = config
