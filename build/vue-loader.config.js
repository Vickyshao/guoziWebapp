module.exports = {
    preserveWhitespace: false,
    postcss: [
        require('autoprefixer')({
            browsers: ['last 5 versions'],
            remove: false
        }),
        require('postcss-px2rem')({
            remUnit: 75
        })
    ]
}
