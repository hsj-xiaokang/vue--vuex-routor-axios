// import Login from './views/Login.vue'
// import NotFound from './views/404.vue'
// import Home from './views/Home.vue'
// import Main from './views/Main.vue'
// import Table from './views/nav1/Table.vue'
// import Form from './views/nav1/Form.vue'
// import user from './views/nav1/user.vue'
// import Page4 from './views/nav2/Page4.vue'
// import Page5 from './views/nav2/Page5.vue'
// import Page6 from './views/nav3/Page6.vue'
// import echarts from './views/charts/echarts.vue'
/**
 * 路由配置项
 * @author heshengjin
 * @date 2017-06-03
 * @type {[*]}
 */

let routes = [
    {
        path: '/login',
        component: resolve => require(['./views/Login.vue'], resolve),
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: resolve => require(['./views/404.vue'], resolve),
        name: '',
        hidden: true
    },

//-----------------------------------------------------------------------静态的路由开始--------------------------------------------
    {
        path: '/',
        component: resolve => require(['./views/Home.vue'], resolve),
        name: '系统管理',
        iconCls: 'el-icon-menu',//图标样式class
        hidden: false,
        subhidden:true,//为了单一菜单和子菜单的区别
        havepermission:false,//有没有权限
        children: [
            {
                path: '/testVUEX_',
                component: resolve => require(['./views/testVUEX_.vue'], resolve),
                name: '系统管理',
                hidden: true,
                havepermission:false,//有没有权限
                children: []
            }
        ]
    },
    {
        path: '/',
        component: resolve => require(['./views/Home.vue'], resolve),
        name: '设备',
        iconCls: 'el-icon-menu',//图标样式class
        hidden: false,
        subhidden:false,//为了单一菜单和子菜单的区别
        havepermission:false,//有没有权限
        children: [
            {
                path: '/deviceCard',
                component: resolve => require(['./views/deviceCard.vue'], resolve),
                name: '设备列表',
                hidden: false,
                havepermission:false,//有没有权限
                meta: { keepAlive: false },
                children: [
                    {
                        path: '/deviceCard/deviceReport/:deviceId/:deviceName',
                        component: resolve => require(['./views/deviceReport.vue'], resolve),
                        name: '设备报表',
                        meta: { keepAlive: false },
                        hidden: true,
                        havepermission:false,//有没有权限
                        beforeEnter: (to, from, next) => {
                            // ...

                            // console.log("设备报表");
                            next();
                        },
                    },
                ]
            },
        ]
    },
    {
        path: '/',
        component: resolve => require(['./views/Home.vue'], resolve),
        name: '报表中心',
        iconCls: 'el-icon-menu',//图标样式class
        hidden: false,
        havepermission:false,//有没有权限
        subhidden:false,//为了单一菜单和子菜单的区别
        children: [
            {
            path: '/testVUEX',
            component: resolve => require(['./views/testVUEX.vue'], resolve),
            name: '报表',
            hidden: false,
            havepermission:false,//有没有权限
            children: []
            }
        ]
    },
    {
        path: '/',
        component: resolve => require(['./views/Home.vue'], resolve),
        name: 'vue_admin',
        iconCls: 'el-icon-menu',//图标样式class
        hidden: false,
        havepermission:false,//有没有权限
        subhidden:false,//为了单一菜单和子菜单的区别
        children: [
            {
                path: '/vue_admin',
                component: resolve => require(['./views/testVUEX.vue'], resolve),
                name: 'vue_admin_sub',
                hidden: false,
                havepermission:false,//有没有权限
                children: []
            }
        ]
    },
    // --------------------------------------------------------------静态的路由结束------------------------------------------

];

export default routes;