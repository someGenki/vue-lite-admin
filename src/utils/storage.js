import Cookies from 'js-cookie'
//docs https://www.npmjs.com/package/js-cookie

const KEY_PREFIX = 'YUAN-'
const KEY_TOKEN = 'ADMIN-TOKEN'
const invalids = [undefined, null, 'undefined', 'null']

export function getToken() {
  return Cookies.get(KEY_TOKEN)
}

export function setToken(token) {
  Cookies.set(KEY_TOKEN, token)
}

export function removeToken() {
  return Cookies.remove(KEY_TOKEN)
}

export function get(key) {
  return localStorage.getItem(KEY_PREFIX + key)
}

export function set(key, val) {
  localStorage.setItem(KEY_PREFIX + key, val)
}

export function remove(key) {
  localStorage.removeItem(KEY_PREFIX + key)
}

export function saveSetting(key, val) {
  if (invalids.includes(val)) {
    console.warn('dont use invalid value!')
  }
  localStorage.setItem(KEY_PREFIX + key, JSON.stringify(val))
}

export function batchSaveSetting(keys, obj) {
  keys.forEach((key) => saveSetting(key, obj[key]))
}

export function getSetting(key, defVal = undefined) {
  let item = localStorage.getItem(KEY_PREFIX + key)
  if (invalids.includes(item)) {
    return defVal
  } else {
    return JSON.parse(item)
  }
}
