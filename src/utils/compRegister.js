/**
 * 全局组件注册
 * @param app - vue app实例
 * @param {object|[]} components - 需要批量注册的组件,每个数组项/对象属性需包含name属性作为默认注册名（待改进，目前是只用来注册ElIcon）
 * @param {object} [opts] - 配置选项
 * @param {string} [opts.prefix] - 全局注册的前缀
 * @param {Map<string,string|false>} [opts.replace] - 替换默认的组件名,用于避免冲突 当Value为false值时不注册该组件
 */
export function globalRegister(app, components, opts) {
  const compsArr = Array.isArray(components)
    ? components
    : Object.values(components)
  const { prefix, replace } = opts

  compsArr.forEach((component) => {
    let name = component.name
    if (replace && replace.has(name)) {
      if (!replace.get(name)) return
      name = replace.get(name)
    }
    if (prefix) {
      name = prefix + name
    }
    app.component(name, component)
  })
}
