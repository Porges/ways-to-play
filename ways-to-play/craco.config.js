const { getLoader, loaderByName } = require('@craco/craco');
const { resolve } = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

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

            const rule = config.module.rules[2];
            if (!('oneOf' in rule)) {
                throw new Error('Craco config needs updating, CRA has been updated.');
            }

            rule.oneOf = [mp3Loader, ...rule.oneOf];




            const urlLoader = getLoader(config, loaderByName('url-loader'));
            if (!urlLoader.isFound) {
                throw new Error("Unable to find 'url-loader' in CRA config");
            }

            const loader = urlLoader.match.loader;
            
            loader.use =
                [ { loader: loader.loader
                  , options:
                        { ...loader.options 
                        , fallback: 'responsive-loader'
                        , adapter: require('responsive-loader/sharp')
                        , name: 'static/media/[name]-[width].[hash:8].[ext]'
                        , sizes: [ 300, 600, 800, 1200, 1600 ]
                        } 
                  }
                ];

            delete loader.loader;
            delete loader.options;




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