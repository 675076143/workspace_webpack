const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//TypeError: CleanWebpackPlugin is not a constructor时，要加{}
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: "production",
    entry: './src/js/index.js',
    output: {
        filename: './js/[hash:5].js',
        path: path.resolve(__dirname, '../dist')
    },
    //loaders
    module: {
        rules: [
            //使用css-loader解析css样式
            /*{
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },*/
            //使用ExtractTextPlugin生成CSS文件
            //使用Postcss-loader扩展css前缀
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","postcss-loader"]
                })
            },
            //使用less-loader将less编译为css样式
            {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        },
            //使用url-loader打包图片文件
            // (相比file-loader能将一定数值下的图片转为base64的格式)
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,//小于8KB的图片，转换为base64
                            outputPath: 'img',//输出的路径
                            publicPath:'../dist/img',//资源路径
                            name:'[hash:5].[ext]'//图片名称(哈希值前五位)
                        }
                    }
                ]
            },
            //使用html-withimg-loader打包HTML中的图片（<img>标签）
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            //使用jshint-loader做语法检查
            /*{
                test: /\.js$/, // 涵盖 .js 文件
                enforce: "pre", // 预先加载好 jshint loader
                exclude: /node_modules/, // 排除掉 node_modules 文件夹下的所有文件
                use: [
                    {
                        loader: "jshint-loader"
                    }
                ]
            },*/
            //使用babel-loader将ES6转为ES5
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    plugins: [
        //使用HtmlWebpackPlugin生成HTML文件
        new HtmlWebpackPlugin({
            title: "Webpack App",//生成html文件的title
            filename: "index.html",//生成html文件的文件名
            template: "./src/index.html",//模板文件
        }),
        //使用CleanWebpackPlugin清空文件夹
        new CleanWebpackPlugin(),
        //使用ExtractTextPlugin生成CSS文件
        new ExtractTextPlugin("css/[hash:5].css"),
        //使用UglifyJsPlugin丑化js
        //webpack自带此插件(webpack4被移除了)
        //sourceMap能对js代码作映射
        new UglifyJsPlugin({sourceMap:true}),
        //使用OptimizeCssAssetsPlugin压缩css
        new OptimizeCssAssetsPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require("cssnano"),
            cssProcessorPluginOptions:{
                preset:['default',{discardComments:{removeAll:true}}]
            },
            canPrint:true
        })
    ],

    devtool: "source-map"
};