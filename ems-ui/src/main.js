import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
//国际化
// import locale from 'element-ui/lib/locale/lang/ja'
// import 'element-ui/lib/theme-default/index.css'
import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
/**
 * mock会影响axios调用，做好关闭mock
 */
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
//引入jQuery③
import $ from 'jquery'
//引入bootstrap②
// import './assets/bootstrap/bootstrap.min.css'
// import './assets/bootstrap/bootstrap.min.js'
import "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.css"
/**
 * axios直接在VUE原形链上面，不推荐
 */
// import axios from 'axios';
// Vue.prototype.$http  = axios;
/**
 * 主入口js文件
 * @author heshengjin
 * @date 2017-06-03
 */

//**************************************start**********************测试import&export*******************************************
/**
 * http://blog.csdn.net/pcaxb/article/details/53670097
 * Created by hsj on 2017/12/19.
 * 由于ES6输入的模块变量，只生成一个动态的只读引用,所以这个变量是只读的，
 * 对它进行重新赋值会报错,只能改变对象属性的值,不能够改变引用。
 * 如果是一个基本数据类型,不是引用类型的数据,也不能改变他的值。
 */
import {count,compute} from './util/utils.js';
console.log(count);//1
compute();
console.log(count);//2</span>

//count = 100; //error
//***************************************end*********************测试import&export*******************************************
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * vue 全局的过滤器
 * 全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
 */
//小数点保留4位 null返回‘无数据’
Vue.filter("numberPoint4", function(value,param) {
    if(value === null){ return "无数据";}
    if(0 === param){
        return value.toFixed(0);
    }
    return value.toFixed(1);
});
//字符串格式化，空串返回‘无数据’，长度等于8直接返回，大于8后面的省略为..
Vue.filter("stringFilter", function(value) {
    if(value === '' || value === null || value === undefined){return "无数据";}
    if(value.length > 8){value = value.substring(0,8) + "..";return value;}
    return value;
});
//在离线状态
Vue.filter("statusFilter", function(value) {
    if(value === '' || value === null || value === undefined){return "未知";}
    if(value === -1){return "离线";}
    if(value === 0){return "在线";}
    return "未知";
});

// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
    routes,
    history: false,
    hashbang: true
})

//登录页面
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
      sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
//默认去设备页面
// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/deviceCard') {
//     next({ path: '/deviceCard' })
//   } else {
//     next()
//   }
// })

//router.afterEach(transition => {
//NProgress.done();
//});

var vm_hsj = new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app');

