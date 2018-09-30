const express = require('express');
const proxyMiddleware = require('http-proxy-middleware');
const config = require('../config/index.js');
const compression = require('compression');
const chalk = require('chalk');
const lruCache = require('lru-cache');
const vueServerRenderer = require('vue-server-renderer');
const net = require('net');
const shell = require('shelljs');
const serialize = require('serialize-javascript');
const favicon = require('serve-favicon');
const resolve = file => path.resolve(__dirname, file);
const fs = require('fs');
const path = require('path');

const log = {
    success: function (data, ...args) {
        // console.log(chalk.green(data, args));
    },
    error: function (data, ...args) {
        // console.log(chalk.red(data, args));
    },
    info: function (data, ...args) {
        // console.log(chalk.white(data, args));
    },
};

let renderer;
let indexHtml;

let killPort = function (port) {
    const promise = new Promise(function (resolve, reject) {
        try {
            const processId = Number(shell.exec(`lsof -t -s TCP:LISTEN -i:${port}`));
            if (processId) {
                log.info(`正在干死进程 ${processId}`);
                shell.exec(`kill ${processId}`, function() {
                    log.success(`成功干死进程 ${processId}`);
                    setTimeout(function() {
                        resolve();
                    }, 1000);
                });
            } else {
                reject('没找到进程，如果是以root权限运行的，需手动杀死进程')
            }
        } catch (e) {
            reject(e);
        }
    });
    return promise;
};

let checkPort = function (port) {
    let server = net.createServer().listen(port);
    let promise = new Promise(function (resolve, reject) {
        server.on('listening', function () {
            server.close();
        });
        server.on('error', function (error) {
            let errorMessage = error.code;
            switch (error.code) {
                case 'EADDRINUSE':
                    errorMessage = `端口 ${port} 被占用`;
                    break;
                case 'EACCES':
                    errorMessage = `没有权限监听 ${port} 端口`;
                    break;
                default:
                    break;
            }
            reject(errorMessage);
        });
        server.on('close', function () {
            resolve();
        });
    });

    return promise;
};

let listenPort = (app, port) => {
    app.listen(port, () => {
        log.success(`服务启动成功 localhost:${port}`);
    });
};

let createRenderer = (bundle) => {
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    let option = {};
    option = config.env.cache && config.env.cache.lruPageCache && {
        cache: lruCache(config.env.cache.lruPageCache),
    };
    return vueServerRenderer.createBundleRenderer(bundle, option);
};

let parseIndex = (template) => {
    const contentMarker = '<!-- APP -->';
    const i = template.indexOf(contentMarker);
    return {
        head: template.slice(0, i),
        tail: template.slice(i + contentMarker.length),
    };
};

module.exports = {
    updateRenderer: function (bundle) {
        renderer = createRenderer(bundle);
    },

    updateIndexHtml: function (template) {
        indexHtml = parseIndex(template);
    },

    startServer: function (app) {
        const serve = (path, cache) => express.static(resolve(path), config.env.cache && config.env.cache.assetsCache);
        config.env.gzip && app.use(compression(config.env.gzip));
        app.use(favicon(config.biz.favicon));
        app.use('/dist', serve('../dist'));
        app.use('/public', serve('../public'));

        if (config.env.proxyTable) {
            Object.keys(config.env.proxyTable).forEach((context) => {
                let options = config.env.proxyTable[context];
                if (typeof options === 'string') {
                    options = {
                        target: options,
                    };
                }
                app.use(proxyMiddleware(context, options));
            });
        }

        const port = config.env.port;

        checkPort(port)
            .then(function () {
                listenPort(app, port);
            })
            .catch(function (errorMessage) {
                log.error(errorMessage);
                if (config.env.autoKill) {
                    killPort(port)
                        .then(function () {
                            listenPort(app, port);
                        })
                        .catch(function (error) {
                            log.error('没干死该进程', error);
                        });
                }
            });

        app.get('/download', (req, res) => {
            const ua = req.headers['user-agent'].toLowerCase();

            if (/iphone|ipad|ipod/.test(ua)) {
                return res.redirect(302, 'https://itunes.apple.com/cn/app/国资文旅/id1218315756?mt=8');
            }
            if (/android/.test(ua)) {
                if (/micromessenger/.test(ua)) {
                    return res.redirect(302, 'http://a.app.qq.com/o/simple.jsp?pkgname=com.gznb.b2b');
                } else {
                    return res.download('./app/download/gzyn_1.0.0.apk');
                }
            }
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            // res.write(body, "utf-8");
            return res.end('抱歉，暂不支持您的系统');
        });
        app.get('*', (req, res) => {
            if (!renderer) {
                return res.end('waiting for compilation... refresh in a moment.');
            }

            config.env.headers && Object.keys(config.env.headers).filter(key => Object.hasOwnProperty.call(config.env.headers, key)).forEach((key) => {
                res.setHeader(key, config.env.headers[key]);
            });

            const startTime = Date.now();
            const context = {
                url: req.url,
            };

            const renderStream = renderer.renderToStream(context);

            renderStream.once('data', () => {
                res.write(indexHtml.head);
            });

            renderStream.on('data', (chunk) => {
                res.write(chunk);
            });

            renderStream.on('end', () => {
                // embed initial store state
                if (context.initialState) {
                    res.write(`<script>window.__INITIAL_STATE__ = ${serialize(context.initialState, { isJSON: true })}</script>`);
                }
                res.end(indexHtml.tail);
                log.info(`请求耗时: ${Date.now() - startTime}ms`);
            });

            renderStream.on('error', (err) => {
                if (err && err.code === '404') {
                    // res.status(404).end('404 | Page Not Found')

                    fs.readFile('./app/views/error/404.html', function (error2, data) {
                        res.writeHead(404, { 'content-type': 'text/html' });
                        res.end(data);
                    });
                } else {
                    // res.status(500).end('Internal Error 500')

                    fs.readFile('./app/views/error/500.html', function (error2, data) {
                        res.writeHead(404, { 'content-type': 'text/html' });
                        res.end(data);
                    });
                    // console.log(err);
                }
                log.error(`请求出错: ${err.code} ${req.url}`);
            });
        });
    },
};
