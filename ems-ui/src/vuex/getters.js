//test
/**
 * get vuex全局量
 * 如：this.$store.getters.getState
 * @author heshengjin
 * @date 2017-06-03
 * @param state
 * @returns {boolean}
 */
export const getDeviceCardShow = state => {
    return state.deviceCardShow;
}
export const getHttp200 = state => {
    return state.http200;
}
export const getUser = state => {
    return state.user;
}
export const getState = state => {
    return state;
}
