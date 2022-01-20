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
  if (val === undefined) {
    console.warn('dont use undefined as value!')
  }
  localStorage.setItem(KEY_PREFIX + key, JSON.stringify(val))
}

export function batchSaveSetting(keys, obj) {
  keys.forEach((key) => saveSetting(key, obj[key]))
}

export function getSetting(key, defVal = undefined) {
  let item = localStorage.getItem(KEY_PREFIX + key)
  if (item === undefined || item === 'undefined') {
    return defVal
  } else {
    return JSON.parse(item)
  }
}
