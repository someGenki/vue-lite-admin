import Cookies from 'js-cookie'
//docs https://www.npmjs.com/package/js-cookie

const KEY_PREFIX = 'YUAN-'
const KEY_TOKEN = 'ADMIN-TOKEN'

export function getToken() {
  return Cookies.get(KEY_TOKEN)
}

export function setToken(token) {
  Cookies.set(KEY_TOKEN, token)
}

export function removeToken() {
  return Cookies.remove(KEY_TOKEN)
}

export function saveSetting(key, val) {
  localStorage.setItem(KEY_PREFIX + key, val)
}

export function batchSaveSetting(keys, obj) {
  keys.forEach((key) => {
    saveSetting(key, obj[key])
  })
}

export function getSetting(key, need, defVal = null) {
  let item = localStorage.getItem(KEY_PREFIX + key)
  if (need === 'int') {
    item = Number.parseInt(item)
    return Number.isInteger(item) ? item : defVal
  } else if (need === 'bool') {
    item = JSON.parse(item)
    return item === true || item === false ? item : defVal
  }
  return item
}
