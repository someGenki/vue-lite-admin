// 用于生产环境中也启用mock以及mock文件夹下的模块
// 逐一导入mock.js文件,并加入createProdMockServer的参数中
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import data from './data'

export function setupProdMockServer() {
  createProdMockServer([...data])
}
