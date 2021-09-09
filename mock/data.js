// 用法文档 https://github.com/anncwb/vite-plugin-mock/blob/HEAD/README.zh_CN.md
import { Result } from './_util'

export default [
  {
    url: '/api/test01',
    method: 'get',
    response: ({ query }) => {
      return { code: 0, data: { name: 'jojo1', query } }
    },
  },
  {
    url: '/api/user/login',
    method: 'post',
    response: Result.succ({
      name: 'jojo',
      token: 'THIS_IS_TOKEN',
      roles: ['admin'],
    }),
  },
  {
    url: '/api/user/info',
    method: 'get',
    response: Result.succ({
      name: 'jojo',
      token: 'THIS_IS_TOKEN',
      roles: ['admin'],
    }),
  },
  {
    url: '/api/demo/download1', // 文件流下载 dev模式下可以地址栏直接访问
    method: 'get',
    rawResponse: async (req, res) => {
      // 没什么意义的延迟半秒才返回数据
      await new Promise((resolve) => setTimeout(() => resolve(), 500))
      // 告知客户端资源的类型 octet-stream为未知
      res.setHeader('Content-Type', 'application/octet-stream;charset=utf-8')
      // attachment 表示以附件方式下载   inline 表示在线打开 jojo.txt是客户端保存的默认文件名
      res.setHeader('Content-Disposition', 'attachment;filename=jojo.txt')
      // 写入文件数据
      res.write('TEXT')
      // 记得flush前端才能接收到
      res.end()
    },
  },
]
