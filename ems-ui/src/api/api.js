import axios from 'axios';

// let base = '';
/**
 * http  ajax 请求页面
 * @author heshengjin
 * @date 2017-06-03
 * @type {string}
 */

let addUrl = "http://xxx.com:11110/";//真正的调用地址

/**
 * 下面的mock的本地模拟HTTP请求调用
 *  @author heshengjin
 * @date 2017-06-03
 * @param params
 * @returns {Promise<R2|R1>|Promise.<TResult>|Promise<R>}
 */
// export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
//
// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
//
// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
//
// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };
//
// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };
//
// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };
//
// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
//
// export const getMenu = () => { return axios.get(`${base}/getmenu`)};


/**
 * 查询设备列表
 * 下面的是真的调用远程服务器的HTTP请求
 * @author heshengjin
 * @date 2017-06-03
 * @returns {AxiosPromise}
 */
export const getDeviceList = () => { return axios.get(addUrl+`api/device/list`)};
/**
 * 修改位置
 * 下面的是真的调用远程服务器的HTTP请求
 * @author heshengjin
 * @date 2017-06-03
 * @param params
 * @returns {Promise<R2|R1>|Promise<R>|Promise.<TResult>}
 */
export const setLocation = params => { return axios.post(addUrl+`api/device/`+params.id+`/location`, params.location,
    {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
}).then(res => res.data); };

/**
 * 修改设备名称
 * 下面的是真的调用远程服务器的HTTP请求
 * @author heshengjin
 * @date 2017-06-03
 * @param params
 * @returns {Promise<R2|R1>|Promise<R>|Promise.<TResult>}
 */
export const setDeviceName = params => { return axios.post(addUrl+`api/device/`+params.id+`/name`, params.name,
    {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }).then(res => res.data); };
/**
 * 删除设备列表
 * 下面的是真的调用远程服务器的HTTP请求
 * @author heshengjin
 * @date 2017-06-03
 * @returns {AxiosPromise}
 */
export const deleteDeviceById = deviceId => { return axios.get(addUrl+`api/device/`+deviceId+`/delete`)};
/**
 * 查找报表数据
 * 下面的是真的调用远程服务器的HTTP请求
 * @author heshengjin
 * @date 2017-06-05
 * @returns {AxiosPromise}
 */
export const getreportData = params => { return axios.get(addUrl+`api/device/`+params.deviceId+`/signal?begin=`+params.begin+`&end=`+params.end)};


/**
 * 测试app上传
 * @param params
 * @returns {Promise.<TResult>|Promise<R>|Promise<R2|R1>}
 */
export const testUploadApp = params => { return axios.post(`http://10.88.20.84:9001/api/tobacco/app/uploadApp`, params,
    {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then(res => res.data); };

/**
 * 很奇怪vue里面只能FormData传递给后台post的@RequestParam
 * 测试app查询
 * @param params
 * @returns {Promise.<TResult>|Promise<R2|R1>|Promise<R>}
 */
export const testQueryAppMess = params => { return axios.post(`http://10.88.20.84:9001/api/tobacco/app/findSysAppSplitPage`, params,
    {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then(res => res.data); };

/**
 * 测试设置默认版本
 * @param params
 * @returns {Promise<R2|R1>|Promise.<TResult>|Promise<R>}
 */
export const testSetDefaultVersion = params => { return axios.post(`http://10.88.20.84:9001/api/tobacco/app/updateASysApp2Defaultversion`, params,
    {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then(res => res.data); };
