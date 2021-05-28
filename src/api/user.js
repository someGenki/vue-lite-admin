import request from '/src/utils/request'
// let isDev = import.meta.env.DEV
export function login(data) {
  return request.post('/user/login', data)
}
export function getInfo(data) {
  return request.get('/user/info', data)
}
