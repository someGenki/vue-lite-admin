import request from '/src/utils/request'

export function login(data) {
  console.log(data)
  return request.post('/user/login', data)
}
export function getInfo(data) {
  return request.get('/user/info', data)
}
