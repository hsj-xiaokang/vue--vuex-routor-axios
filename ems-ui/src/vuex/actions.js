//test
/**
 * 操作vuex全局量
 * 具体操作详细如下注释那些
 * @author heshengjin
 * @date 2017-06-03
 * @param commit
 */
export const increment_true = ({commit}) => {
    commit('INCREMENT_true');
}
export const decrement_false = ({commit}) => {
    commit('DECREMENT_false');
}

export const increment_200 = ({commit}) => {
    commit('INCREMENT_200');
}
export const decrement_200 = ({commit}) => {
    commit('DECREMENT_200');
}
export const opreat200Param = ({commit},param) => {
    commit('OPREAT200PARAM',param);
}

