export function debounce(fn, wait = 100) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, wait)
  }
}

/**
 * @example
 *   let result = recursionMerge( duplicateArray,
 *    (v1, v2) => v1.mid === v2.mid,  ///*对象的equal方法
 *    (c, p) => c.pid === p.mid )    //父子关系的判断方法
 *
 * @param { Array } objArr  需要合并的树型对象的数组
 * @param { Function } equalFn 对象的比较方法
 * @param { Function } isChildrenFn 对象间父子关系的判断
 * @returns { Object } 对象的key为层级,value为该层级的所有不重复节点（带子节点）。从'1'层开始
 **/
export function recursionMerge(objArr, equalFn, isChildrenFn) {
  const levelArrayObj = {}

  // 分层，层级遍历
  function recursion(arr, level) {
    arr.forEach(v => {
        if (!Array.isArray(levelArrayObj[level]))  // 对obj.层级进行初始化（如果未初始化的话
          levelArrayObj[level] = []
        if (!levelArrayObj[level].some(value => equalFn(value, v))) {
          levelArrayObj[level].push(v)  // 每层里面的节点保证唯一（根据传进来的比较方法作为回调函数来比较）
        }
        if (Array.isArray(v.children))  // 有子数组再去递归找下一层
          recursion(v.children, level + 1);
        v.children = []                 // 如果这里删除原有的children，那下面的挂载操作就不用判断有没有在children出现过
      }
    )
  }

  recursion(objArr, 1)

  // 子菜单挂载到父菜单上
  for (let level in levelArrayObj) {
    if (level === '1') continue;             // 第一层为父级菜单，固跳过从子菜单开始
    levelArrayObj[level].forEach(c => {   // 遍历所有level层的节点，去找对应的父节点
      levelArrayObj[level - 1].forEach(p => {   //遍历父节点 p.mid=m.pid证明找到爹了，然后还要判断没有再children中
        if (isChildrenFn(c, p))
          p.children.push(c)
      })
    });
  }

  return levelArrayObj;
}

