import axios from 'axios'
import { getToken } from './storage.js'
import { ElMessage } from 'element-plus'

const BASEURL = import.meta.env.VITE_BASE_URL
// let isDev = import.meta.env.DEV
axios.defaults.timeout = 5000 //响应超时时间
axios.defaults.baseURL = BASEURL //请求根路径

// 配置**请求**拦截器
axios.interceptors.request.use((request) => {
  let token = getToken()
  if (token) request.headers.token = token
  return request
})

// 配置**响应**拦截器
axios.interceptors.response.use(
  // 响应200
  (response) => {
    // ... doing something
    return Promise.resolve(response.data)
  },
  // 响应4xx 5xx
  (error) => {
    // ... doing something
    ElMessage({ message: error.response?.data?.msg || 'undefined' }) // 这里的可选运算符'?.'可能低版本的浏览器不支持
    return Promise.reject(error.response)
  }
)

export default axios
