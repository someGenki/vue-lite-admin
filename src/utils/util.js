const isObject = (obj) => (obj !== null && typeof obj === 'object')

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

export function throttle(fn, delay = 200) {
  let last = null
  let timer = null
  return function (...args) {
    let now = Date.now()
    // 在时间间隔内，不触发，而且是取消定时器。当函数出发后要记录触发时间
    if (last && now < last + delay) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
        last = now
      }, delay)
    } else {
      fn.apply(this, args)
      last = now
    }
  }
}

export function deepClone(target, map = new WeakMap()) {
  if (!(target && typeof target === 'object'))
    return target  // 非对象直接返回值
  if (map.get(target))
    return target  // 解决循环引用
  if ([Date, RegExp, Set, Map].includes(target.constructor))
    return (new target.constructor(target)) // 特殊类型克隆

  const cloneTarget = Object.create(Object.getPrototypeOf(target)) // 继承原型
  map.set(cloneTarget, true)
  // Object.keys() 返回可枚举的属性,Reflect.ownKeys是所有的
  Reflect.ownKeys(target).forEach(key => cloneTarget[key] = deepClone(target[key], map))

  return cloneTarget;
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

// ==TEST==
const obj1 = {
  name: 'jojo', age: 18, addr: {
    cite: 'London'
  }
}
