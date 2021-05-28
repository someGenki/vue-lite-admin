import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import test from '../mock/data.js'
// Prod环境下开启mock.js功能
export function setupProdMockServer() {
  createProdMockServer([...test])
}
