const path = require('path');
const vueConfig = require('./vue-loader.config');
const config = require('../config/index.js');
const getAssetPath = _path => path.posix.join(config.env.assetsDirectory, _path);

module.exports = {
    devtool: '#source-map',
    entry: {
        app: './app/client-entry.js',
        vendor: [
            'es6-promise',
            'babel-polyfill',
            'vue',
            'vue-router',
            'vuex',
            'vuex-router-sync',
            'swiper',
            'normalize.css',
            'swiper/dist/css/swiper.css',
        ],
    },
    // eslint: {
    //     formatter: require('eslint-friendly-formatter'),
    // },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js',
    },
    resolve: {
        alias: {
            public: path.resolve(__dirname, '../public'),
        },
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [{
            test: /\.css$/,
            loader: 'vue-style-loader!css-loader',
        }, {
            enforce: 'pre',
            test: /\.vue$/,
            exclude: [
                /\/app\/components/,
                /\/app\/directives/,
                /\/app\/filters/,
                /\/app\/utilities/,
                /\/app\/views\/test-component/,
            ],
            loader: 'eslint-loader',
            options: {
                formatter: require('eslint-friendly-formatter'),
            },
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueConfig,
        }, {
            enforce: 'pre',
            test: /\.js$/,
            exclude: [
                /\/app\/components/,
                /\/app\/directives/,
                /\/app\/filters/,
                /\/app\/utilities/,
                /\/app\/views\/test-component/,
                /gz-native.js/,
            ],
            loader: 'eslint-loader',
            options: {
                formatter: require('eslint-friendly-formatter'),
            },
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules(?![\\/](gz-vue|vue-echarts)[\\/])/,
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
                limit: 40000,
                name: getAssetPath('imgs/[name].[ext]?[hash]'),
            },
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: getAssetPath('fonts/[name].[hash:7].[ext]'),
            },
        }],
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
    },
};