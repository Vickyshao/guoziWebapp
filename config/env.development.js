const path = require('path');

module.exports = {
    port: 8008,
    autoKill: true, // 如果发现端口被占用，自动杀死占用端口的进程
    assetsDirectory: path.resolve(__dirname, '../dist/assets'),
    cache: {
        lruPageCache: {
            max: 1000,
            maxAge: 1000 * 60 * 15,
        },
        assetsCache: {
            maxAge: 60 * 60 * 24 * 30,
        },
    },
    cssSourceMap: false,
    proxyTable: {
        '/api/': {
            target: 'http://localhost:8008',
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
    // https://github.com/expressjs/compression
    gzip: {
        level: 0,
        threshold: '5kb',
    },
    mock: false,
};
