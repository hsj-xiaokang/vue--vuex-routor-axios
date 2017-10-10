import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
/**
 * vuex 官方推荐的全局量存储
 * @author heshengjin
 * @date 2017-06-03
 */
Vue.use(Vuex)

// 应用初始状态
const state = {
    deviceCardShow: true,
    http200:200,
}

// 定义所需的 mutations
const mutations = {
    INCREMENT_true(state) {
        state.deviceCardShow=true;

    },
    DECREMENT_false(state) {
        state.deviceCardShow=false;
    },
    INCREMENT_200(state) {
        state.http200 += 1;

    },
    DECREMENT_200(state) {
        state.http200 -= 1;
    },
    OPREAT200PARAM(state,param){
        state.http200 += param;
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})



/**  *********************解决vuex刷新之后就没有方案，配合localstorage****************************

    // 定义状态
    state: {
        navTabIndex:0//切换顶部导航栏序号
    },
    mutations:{
        navTab(state,index){
            state.navTabIndex = index;
            window.localStorage.setItem('navTabIndex',index);
        }
    }


<template>
<div>{{navTabIndex}}</div>
</template>
<script>


    computed: mapState({
        navTabIndex: function(state){//箭头函数会有this的问题
            let localData = window.localStorage.getItem('navTabIndex')
            if(state.navTabIndex===0&&localData){
                this.$store.commit('navTab',localData)//同步操作
            }
            return state.navTabIndex
        }
    })

</script>
 **/