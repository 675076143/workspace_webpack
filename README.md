# workspace_webpack
## webpack脚手架配置

### 主要涉及三个配置文件  

webpack.build.js //生产环境配置  
webpack.dev.js //开发环境配置  
webpack.dist.js //生产环境配置  

实现了 src --> build --> dist  的自动化生产

```javascript
loader:[
  使用css-loader解析css样式,
  使用ExtractTextPlugin生成CSS文件,
  使用Postcss-loader扩展css前缀,
  使用less-loader将less编译为css样式,
  使用url-loader打包图片文件(相比file-loader能将一定数值下的图片转为base64的格式),
  使用html-withimg-loader打包HTML中的图片（<img>标签）,
  使用jshint-loader做语法检查,
  使用babel-loader将ES6转为ES5,
]

plugin:[
  使用HtmlWebpackPlugin生成HTML文件,
  使用CleanWebpackPlugin清空文件夹,
  使用ExtractTextPlugin生成CSS文件,
  使用UglifyJsPlugin丑化js,
    -使用sourceMap对js代码作映射
  使用OptimizeCssAssetsPlugin压缩css
]

//使用devServer
devServer: {
    compress: true,//压缩
    port: 9000,//端口号
    open: true,//自动打开浏览器
    hot:true//热模替换
}
```
