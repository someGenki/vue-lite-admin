import axios from 'axios'
import { getToken } from './storage.js'
import { ElMessage } from 'element-plus'

const BASEURL = import.meta.env.VITE_BASE_URL

axios.defaults.timeout = 5000 //响应超时时间
axios.defaults.baseURL = BASEURL //请求根路径

// 配置*请求*拦截器
axios.interceptors.request.use((request) => {
  let token = getToken()
  if (token) request.headers.token = token
  return request
})

// 配置*响应*拦截器
axios.interceptors.response.use(
  (response) => {
    // ... doing something
    return Promise.resolve(response.data)
  },

  (error) => {
    // 这里的可选运算符'?.'可能低版本的浏览器不支持
    ElMessage({ message: error.response?.data?.msg || 'null!' })
    return Promise.reject(error.response)
  }
)

/*// 学了fetch再来搞 先放着
axios.fetch = async (url, config = {}) => {
  return fetch(BASEURL + url, {
    method: config.method || 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      accept: 'application/json, text/plain, *!/!*',
      token: getToken(),
      ...config.headers,
    },
    body: JSON.stringify(config.data),
  })
    .then((res) => {
      console.log(res)
      if (res.ok) return res.json()
      else return Promise.reject(res)
    })
    .then((res) => onResponseSuccess(res))
    .catch((rej) => {
      return onResponseFailure(rej)
    })
}*/

export default axios
