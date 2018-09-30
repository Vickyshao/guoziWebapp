const path = require('path');

module.exports = {
    port: 80,
    autoKill: false,
    assetsDirectory: path.resolve(__dirname, '../dist/assets'),
    cache: {
        lruPageCache: {
            max: 1000,
            maxAge: 1000 * 60 * 15,
        },
        assetsCache: {

        },
    },
    cssSourceMap: false,
    proxyTable: {
        '/api/': {
            target: 'http://localhost:8001',
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
