const express = require('express')
const proxyMiddleware = require('http-proxy-middleware');
const lruCache = require('lru-cache')
const vueServerRenderer = require('vue-server-renderer')
const serverBase = require('./server.base.js')
const app = express()

// in development: setup the dev server with watch and hot-reload,
// and update renderer / index HTML on file change.
require('./setup-dev-server')(app, {
    bundleUpdated: bundle => {
        serverBase.updateRenderer(bundle)
    },
    indexUpdated: index => {
        serverBase.updateIndexHtml(index)
    }
})

serverBase.startServer(app)
