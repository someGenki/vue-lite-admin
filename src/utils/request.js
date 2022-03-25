import axios from 'axios'
import { getToken } from './storage.js'
import { ElMessage } from 'element-plus'

const BASEURL = String(import.meta.env.VITE_BASE_URL)

axios.defaults.timeout = 5000 // 响应超时时间
axios.defaults.baseURL = BASEURL // 请求根路径

// 配置 请求 拦截器
axios.interceptors.request.use((request) => {
  let token = getToken()
  if (token) request.headers.token = token
  return request
})

// 配置 响应 拦截器
axios.interceptors.response.use(
  // 响应200
  (response) => {
    // ... doing something
    return Promise.resolve(response.data)
  },
  // 响应4xx 5xx
  (error) => {
    // ... doing something
    ElMessage({ message: error.response?.data?.msg || 'undefined' })
    return Promise.reject(error.response)
  }
)

// jsonp('url',{param1:data}).then(data => { console.log(data) })
export function jsonp(url, params, cbName = null) {
  // 函数调用计数，每次调用该函数时自增，用于避免回调函数重名
  const cbCount = jsonp.cnt = (jsonp.cnt | 0) + 1
  const callbackName = cbName || ('cb_' + cbCount)

  // 拼接请求参数 先是判断是否已有查询参数，后添加回调函数名作为参数
  let querystring = (url.indexOf('?') > 0 ? '&' : '?') +
    (`callback=${callbackName}`)
  Object.entries(params || {}).
    forEach(([k, v]) => querystring += (`&${k}=${v}`))

  // 创建script标签，添加src属性并添加到body中
  const scriptTag = document.createElement('script')
  scriptTag.src = url + querystring
  document.appendChild(scriptTag)

  return new Promise((resolve) =>
    window[callbackName] = (data) => {
      resolve(data)
      scriptTag.remove()
      delete window[callbackName]
    },
  )
}

export default axios
