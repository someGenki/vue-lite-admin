import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const Code_Enum = {
  SUCC: 200,
  FAIL: 1000,
}

const Msg_Enum = {
  SUCC: '操作成功',
  FAIL: '操作失败',
}

/**
 * 返回结果标准化包裹类
 * @example Result.succ({name:'jojo'})
 */
export class Result {
  static succ(data) {
    return { code: Code_Enum.SUCC, msg: Msg_Enum.SUCC, data }
  }

  static fail(data, code = Code_Enum.FAIL, msg = Msg_Enum.FAIL) {
    return { data, code, msg }
  }
}
