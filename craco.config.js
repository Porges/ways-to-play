const { getLoader, loaderByName } = require('@craco/craco');
const { resolve } = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const { inspect } = require('util');

module.exports = {
    webpack : {
        configure: (webpackConfig, { env, paths }) => {

            const config = { ...webpackConfig };

            const mp3Loader = 
                {
                    test: /\.mp3$/,
                    loader: 'file-loader',
                    options: { name: 'static/media/[name].[hash:8].[ext]' }
                };

            const rule = config.module.rules[1];
            if (!rule || !('oneOf' in rule)) {
                throw new Error('Craco config needs updating, CRA has been updated.');
            }

            rule.oneOf = [mp3Loader, ...rule.oneOf];

            const loader = rule.oneOf[2];
            if (!loader.loader.includes('url-loader')) {
                throw new Error("Craco config needs updating, CRA has been updated.");
            }

            loader.use =
                [ { loader: loader.loader
                  , options:
                        { ...loader.options 
                        , fallback:
                          { loader: require.resolve('responsive-loader')
                          , options:
                            { adapter: require('responsive-loader/sharp')
                            , sizes: [ 300, 600, 800, 1200, 1600 ]
                            , esModule: true
                            , cacheDirectory: 'cache-responsive'
                            }
                          }
                        , name: 'static/media/[name]-[width].[hash:8].[ext]'
                        } 
                  }
                ];

            delete loader.loader;
            delete loader.options;

            console.error(inspect(loader, false, 100, true));

            const imageMin =
                new ImageminPlugin(
                    { test: /\.(jpe?g|png|gif|svg)$/i 
                    , cacheFolder: resolve('./cache')
                    });
            config.plugins = [...config.plugins, imageMin];

            return config;
        }
    }
}
