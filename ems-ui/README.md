
# To start
注册淘宝的npm镜像，加快依赖模块的下载速度，之后cnpm替换npm；
npm install -g cnpm --registry=http://registry.npm.taobao.org

``` bash
# install dependencies
# cd 进入项目的根目录执行下面命令安装依赖模块
cnpm install

# serve with hot reload at localhost:8080
# 执行下面的命令启动开发模式，修改之后自动刷新浏览器 默认端口8080
cnpm run dev

# build for production with minification
# 打包混淆，自动将ES6代码转换成ES5代码供目前的浏览器执行，目前的浏览器大多数不支持ES6
cnpm run build

```

# Folder structure
* build - webpack config files
* config - webpack config files
* dist - build
* src - app
    * api
    * assets
    * common
    * components - your vue components
    * mock
    * styles
    * views - your pages
    * vuex
    * App.vue
    * main.js - main file
    * routes.js
* static - static assets //图片一般放在这里

