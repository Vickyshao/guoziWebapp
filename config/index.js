// see http://vuejs-templates.github.io/webpack for documentation.
// const path = require('path');
// // console.log('assetsRoot', path.resolve(__dirname, '../dist'))

const envConfig = {
    development: {
        biz: require('./biz'),
        env: require('./env.development'),
        entrances: require('./entrance.js'),
    },

    test: {
        biz: require('./biz'),
        env: require('./env.test'),
        entrances: require('./entrance.js'),
    },

    preview: {
        biz: require('./biz'),
        env: require('./env.preview'),
        entrances: require('./entrance.js'),
    },

    prerelease: {
        biz: require('./biz'),
        env: require('./env.prerelease'),
        entrances: require('./entrance.js'),
    },

    production: {
        biz: require('./biz'),
        env: require('./env.production'),
        entrances: require('./entrance.js'),
    },
};

module.exports = envConfig[process.env.NODE_ENV];
