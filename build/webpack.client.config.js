const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const base = require('./webpack.base.config');
const vueConfig = require('./vue-loader.config')
const HTMLPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const extractCSS = new ExtractTextPlugin('style.css');
const thirdPartyCss = new ExtractTextPlugin('third-party.css');

module.exports = Object.assign({}, base, {
    resolve: {
        alias: Object.assign({}, base.resolve.alias, {
            'create-api': './create-api-client.js'
        })
    },
    module: Object.assign({}, base.module, {
        rules: base.module.rules.map((rule) => {
            if (rule.loader === 'vue-loader') {
                return Object.assign({}, rule, {
                    options: Object.assign({}, vueConfig, {
                        loaders: {
                            less: extractCSS.extract({
                                use: 'css-loader!less-loader',
                                fallback: 'vue-style-loader',
                            }),
                            css: extractCSS.extract({
                                use: 'css-loader!less-loader',
                                fallback: 'vue-style-loader',
                            }),
                        },
                    }),
                });
            }
            if (rule.loader === 'vue-style-loader!css-loader') {
                return Object.assign({}, rule, {
                    loader: thirdPartyCss.extract({
                        use: 'css-loader',
                        fallback: 'vue-style-loader',
                    })
                })
            }
            return rule;
        }),
    }),
    plugins: (base.plugins || []).concat([
        // strip comments in Vue code
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        extractCSS,
        thirdPartyCss,
        // generate output HTML
        new HTMLPlugin({
            template: 'app/index.template.html'
        }),
        ...(process.env.NODE_ENV !== 'development' ? [
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            // minify JS
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ] : []),
    ])
});
