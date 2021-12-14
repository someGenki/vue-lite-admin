/**
 * 全局组件注册
 * @param app - vue app实例
 * @param comps - 需要批量注册的组件数组,也可以是对象，每个数组项/对象属性需包含name属性作为默认注册名（待改进，目前是只用来注册ElIcon）
 * @param {object} [opts] - 配置选项
 * @param {string} [opts.prefix] - 全局注册的前缀
 * @param {Map<string,string>} [opts.replace] - 替换默认的组件名,Map对象的Value为falsy值时不注册该组件
 */
export function globalRegister(app, comps, opts) {
  // 改成for in ?
  const compsArr = Array.isArray(comps) ? comps : Object.values(comps)
  compsArr.forEach((comp) => {
    if (opts && opts.prefix) {
      // TODO 前缀格式校验
      // 如果有replace属性，则根据该属性来覆盖默认传进来的组件名
      const map = opts.replace
      if (map && map.size > 0 && map.has(comp.name)) {
        const replaceName = map.get(comp.name)
        if (replaceName) app.component(opts.prefix + replaceName, comp)
      } else {
        app.component(opts.prefix + comp.name, comp)
      }
    } else {
      app.component(comp.name, comp)
    }
  })
}
