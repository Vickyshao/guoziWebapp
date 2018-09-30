const path = require('path');

module.exports = {
    port: 59999,
    autoKill: true,
    assetsDirectory: path.resolve(__dirname, '../dist/assets'),
    cache: {
        lruPageCache: {
            max: 1000,
            maxAge: 1000 * 60 * 15,
        },
        assetsCache: {

        },
    },
    cssSourceMap: true,
    proxyTable: {
        '/api/': {
            target: 'http://localhost:8009',
            pathRewrite: {
                '^/api': '/',
            },
            changeOrigin: true,
        },
    },
    headers: {
        'Content-Type': 'text/html',
        Server: require('./server-info.js'),
    },
    gzip: {
        level: 0,
        threshold: '5kb',
    },
};
