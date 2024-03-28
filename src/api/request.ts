import axios from "axios";
import config from "../config";
import { ElMessage } from "element-plus";
const  NET_ERROR = '网络请求异常，请稍后重试。。。。'
const service = axios.create({
  baseURL: config.baseApi,
});
//请求前处理
service.interceptors.request.use((req) => {
  return req;
});
//请求后处理
service.interceptors.response.use((res) => {
  console.log(res.data)
  const { code, data, msg } = res.data;
  if (code == 200) {
    return data
  }else{
    ElMessage.error( msg||NET_ERROR )
  }
  return Promise.reject(msg||NET_ERROR)
});
//核心处理程序
function request(options:any){
    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get'){
        options.params = options.data
    }
    let isMock = config.mock
    if (typeof options.mock != 'undefined'){
        isMock = options.mock
    }
    if (config.env === 'prod'){
        service.defaults.baseURL = config.baseApi
    }else{
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }

    return service(options)
}

export default  service

