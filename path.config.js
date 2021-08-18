module.exports = {
    input: {
        entry: './src/app.js', //入口js路径
        template: './src/app.html', //html模版路径
        htmlName: 'index.html', //保存html文件名
    },
    output: {
        js: 'static/js/[name].js', //保存js路径及文件名
        style: 'static/css/[name].css', //保存css路径及文件名
        img: 'static/images/[name].[ext]' //保存静态资源(图片和字体等)路径及文件名
    },

};