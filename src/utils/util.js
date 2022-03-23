const isObject = (obj) => (obj !== null && typeof obj === 'object')

// 延时执行版防抖  使用场景：按钮点击、输入框验证
export function debounce(fn, delay = 1000) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
// 定时器版立即执行节流 使用场景: input输入 页面滚动 窗口缩放 按键长按 联想搜索 滚动加载更多
export function throttle(fn, interval = 1000) {
  let timer = null
  return function(...args) {
    if (timer === null) {
      fn(...args)
      // timer为null时，有空可执行。并设置timer，interval之后再置为null
      timer = setTimeout(() => timer = null, interval);
    }
  }
}

export function deepClone(target, map = new WeakMap()) {
  if (target === null || typeof target !== 'object') return target // 基本类型返回
  if ([Date, RegExp, Set, Map, Function].includes(target.constructor))
    return (new target.constructor(target)) // 特殊类型克隆
  if (map.get(target)) return map.get(target)
  const newTarget = Array.isArray(target) ? [] : {}
  map.set(target, newTarget)
  for (let prop in target) {
    if (target.hasOwnProperty(prop))
      newTarget[prop] = deepClone(target[prop], map)
  }
  return newTarget
}

export function deepEqual(o1, o2) {
  // 类型不全为Object则直接使用 === 比较
  if (!isObject(o1) || !isObject(o2)) return o1 === o2
  // 地址值一样则是同一个对象
  if (o1 === o2) return true
  // 获取对象的keys
  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);
  // keys长度不一致 提前返回 false
  if (keys1.length !== keys2.length) return false;
  // 递归比较2个 object 的key值
  return keys1.every((k1, idx) => deepEqual(o1[k1], o2[keys2[idx]]))
}
