const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    webpack: (config, env) => {
        config.optimization.splitChunks.name = 'vendors';

        if (env === 'development') {
            config.output.publicPath = 'http://localhost:3000/';

            config.plugins.push(
                new BundleTracker({
                    path: __dirname,
                    filename: 'webpack-stats.dev.json',
                }),
            );

            config.entry = config.entry.filter(x => !x.includes('webpackHotDevClient'));
            config.entry.push(require.resolve('webpack-dev-server/client') + '?http://localhost:3000');
            config.entry.push(require.resolve('webpack/hot/dev-server'));
        } else if (env === 'production') {
            config.output.publicPath = '/static/';

            config.plugins.push(
                new BundleTracker({
                    path: __dirname,
                    filename: 'webpack-stats.prod.json',
                }),
            );
        }
        return config;
    },
    devServer: function (configFunction) {
        return function (proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);
            config.headers = { 'Access-Control-Allow-Origin': '*' };
            return config;
        };
    },
};
