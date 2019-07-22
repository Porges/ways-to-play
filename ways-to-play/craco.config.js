const { getLoader, loaderByName } = require('@craco/craco');
const { resolve } = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
    webpack : {
        configure: (webpackConfig, { env, paths }) => {

            const config = { ...webpackConfig };

            const urlLoader = getLoader(config, loaderByName('url-loader'));
            if (!urlLoader.isFound) {
                throw new Error("Unable to find 'url-loader' in CRA config");
            }

            const loader = urlLoader.match.loader;
            
            loader.use =
                [ { loader: loader.loader
                  , options: Object.assign({}, loader.options) 
                  }
                , { loader: require.resolve('responsive-loader')
                  , options:
                    { adapter: require('responsive-loader/sharp')
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