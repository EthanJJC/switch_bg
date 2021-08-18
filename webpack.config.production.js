const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const TerserJSPlugin = require("terser-webpack-plugin");
const filePath = require('./path.config');
module.exports={
    entry:{
        index:filePath.input.entry
    },
    mode:'production',//两种模式 production  development
    output: {
        filename:filePath.output.js,//'static/js/[name].js'
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [//插件
        new HtmlWebpackPlugin({
            title: 'VoxFun',
            template: filePath.input.template,
            filename: filePath.input.htmlName,
            minify:{
                removeComments: true,
                removeAttributeQuotes:true,
                collapseWhitespace:true
            },
            // hash: true
        }),
        new MiniCssExtractPlugin({
            filename: filePath.output.style, //"static/css/[name].css"
        }),
        new CleanWebpackPlugin(),
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
                  MiniCssExtractPlugin.loader,
                //   'style-loader',
                  'css-loader',
                  'stylus-loader'
              ]
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    // limit以下使用url-loader转为base64，以上使用指定loader，默认file-loader处理图片图片。单位：字节
                    limit: 10000,
                    // [ext]文件扩展名
                    name:filePath.output.img
                }

            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name:filePath.output.img
                }
            },
           
            
        ]
    },
    optimization:{
        // splitChunks:{
        //     chunks:"all"
        // },
        minimizer:[
            new TerserJSPlugin({
                // 开启缓存
                cache: true,
                // 压缩需要
                parallel: true,
                // 压缩的默认选项
                terserOptions: {
                    warnings: false,
                    parse: {},
                    compress: {
                        arrows:false,
                        warnings: false,
                        drop_debugger: true, // console
                        drop_console: false,
                        // pure_getters:true,
                        // pure_funcs:['console.log'], // 移除console
                        ecma:6,
                        unsafe_proto: true,
                        unsafe_Function:true,
                        evaluate: true,
                        hoist_vars:true,
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,

                }
            })
        ],
        // runtimeChunk: "single",
    }
};
