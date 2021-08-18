const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack = require('webpack');
const filePath = require('./path.config');
module.exports={
    devServer: {
        open: true,
        hot: true,
        port:3000,
    },
    entry:filePath.input.entry,
    mode:'development',
    plugins: [
        // 热替换
        new webpack.HotModuleReplacementPlugin(),
        // html模板
        new HtmlWebpackPlugin({
            // 设置生成的index.html的title，设置template模板后会被覆盖
            title: '这是一个title',
            // html生成子目录，默认为output.path也就是build/下
            filename: filePath.input.htmlName,
            template: filePath.input.template,
            // 注入方式。true,'body'使js资源放入body底部。'head'使js资源放入body头部
            inject: true
        })
    ],
    module: {//模块
        // noParse: /jquery/,
        rules: [ //规则 css-loader style-loader stylus stylus-loader
            {
                test: /\.js|jsx$/,
                use: {
                    loader: "babel-loader",
                    options:{
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins:[
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            { test: /\.styl$/,
              use: [
                  'style-loader',
                  'css-loader',
                  'stylus-loader'
              ]
            },
        ]
    },
};
