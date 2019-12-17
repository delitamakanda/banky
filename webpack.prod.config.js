var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackOnBuildPlugin = require('on-build-webpack');
var TerserPlugin = require('terser-webpack-plugin');

var config = require('./webpack.base.config.js');

config.output.path = path.resolve('./apps/static/dist')

config.mode = 'production';

config.plugins = config.plugins.concat([
    new BundleTracker({filename: './webpack-stats-prod.json'}),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
        // compressor: {
            // warnings: false
        // }
    // }),
    new ExtractTextPlugin('styles.[hash].css'),
    new WebpackOnBuildPlugin(function(stats) {
        var newlyCreatedAssets = stats.compilation.assets;

        var unlinked = [];

        var buildDir = 'apps/static/dist/';

        fs.readdir(path.resolve(buildDir), (err, files) => {
          files.forEach(file => {
            if (!newlyCreatedAssets[file]) {
              fs.unlinkSync(path.resolve(buildDir + file));
              //path.resolve(buildDir + file);
              unlinked.push(file);
            }
          });
          if (unlinked.length > 0) {
              unlinked.forEach(unlink => {
                  fs.rmdirSync(buildDir);
              });
              console.log('Removed old assets: ', unlinked);
          }
      });
  })
])

config.optimization = {
    minimizer: [
        new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            terserOptions: {
                output: {
                    comments: false,
                },
            },
        }),
    ],
};

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
            use: ['css-loader','sass-loader'],
            publicPath: './',
        })
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
