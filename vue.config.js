'use strict'
const path = require('path')
const pkg = require('./package.json')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = pkg.name || 'vue-admin'
const port = 5393

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'developement',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target:process.env.VUE_APP_BASE_URL,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    }
}